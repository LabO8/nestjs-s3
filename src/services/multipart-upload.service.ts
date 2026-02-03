import {
  AbortMultipartUploadCommand,
  CompleteMultipartUploadCommand,
  CreateMultipartUploadCommand,
  ListPartsCommand,
  S3Client,
  UploadPartCommand,
} from '@aws-sdk/client-s3';
import { getSignedUrl } from '@aws-sdk/s3-request-presigner';
import { Inject, Injectable, BadRequestException } from '@nestjs/common';
import { DEFAULT_EXPIRES_IN, S3_CONFIG, S3_SERVICE } from '../constants';
import { prepareOptions } from '../helpers';
import { PrefixService } from './prefix.service';
import {
  ListPartsResult,
  MultipartUploadAbortion,
  MultipartUploadCompletion,
  MultipartUploadInitiation,
  MultipartUploadOptions,
  PartSizeCalculation,
  PresignedUploadUrl,
  UploadPart,
} from '../types/multipart-upload.type';
import { S3Config } from '../types/s3-config.type';

@Injectable()
export class MultipartUploadService {
  // AWS S3 Multipart Upload Constraints
  private static readonly CONSTRAINTS = {
    MIN_PART_SIZE: 5 * 1024 * 1024, // 5MB
    MAX_PARTS: 10000,
    MIN_PART_NUMBER: 1,
  } as const;

  private readonly defaultPartSize: number;

  constructor(
    @Inject(S3_SERVICE) private readonly client: S3Client,
    @Inject(S3_CONFIG) private readonly options: S3Config,
    private readonly prefixService: PrefixService,
  ) {
    this.defaultPartSize = this.validateAndGetDefaultPartSize();
  }

  async initiateMultipartUpload(
    bucket: string,
    key: string,
    options?: MultipartUploadOptions,
  ): Promise<MultipartUploadInitiation> {
    const { disableAutoPrefix, prefixContext, options: preparedOptions } = prepareOptions(options || {});
    const prefixedKey = disableAutoPrefix ? key : this.prefixService.prefix(key, bucket, prefixContext);

    const command = new CreateMultipartUploadCommand({
      Bucket: bucket,
      Key: prefixedKey,
      ...preparedOptions,
    });

    const response = await this.executeS3Command(
      () => this.client.send(command),
      'Failed to initiate multipart upload',
    );

    if (!response.UploadId) {
      throw new BadRequestException('Failed to initiate multipart upload: No upload ID returned');
    }

    return {
      uploadId: response.UploadId,
      key: prefixedKey,
      bucket: response.Bucket || bucket,
    };
  }

  /**
   * Generate a presigned URL for uploading a part.
   * @param bucket - S3 bucket name
   * @param key - Object key (use the prefixed key from initiateMultipartUpload)
   * @param uploadId - Upload ID from initiateMultipartUpload
   * @param partNumber - Part number (1-10000)
   * @param expiresIn - URL expiration time in seconds
   */
  async getUploadPartPresignedUrl(
    bucket: string,
    key: string,
    uploadId: string,
    partNumber: number,
    expiresIn: number = DEFAULT_EXPIRES_IN,
  ): Promise<PresignedUploadUrl> {
    this.validatePartNumber(partNumber);

    const command = new UploadPartCommand({
      Bucket: bucket,
      Key: key,
      UploadId: uploadId,
      PartNumber: partNumber,
    });

    const url = await this.executeS3Command(
      () => getSignedUrl(this.client, command, { expiresIn }),
      'Failed to generate presigned URL',
    );

    return { url, partNumber, uploadId };
  }

  /**
   * Complete a multipart upload.
   * @param bucket - S3 bucket name
   * @param key - Object key (use the prefixed key from initiateMultipartUpload)
   * @param uploadId - Upload ID from initiateMultipartUpload
   * @param parts - Array of uploaded parts with ETags and part numbers (must be sorted)
   */
  async completeMultipartUpload(
    bucket: string,
    key: string,
    uploadId: string,
    parts: UploadPart[],
  ): Promise<MultipartUploadCompletion> {
    this.validateParts(parts);

    const command = new CompleteMultipartUploadCommand({
      Bucket: bucket,
      Key: key,
      UploadId: uploadId,
      MultipartUpload: {
        Parts: parts.map(({ ETag, PartNumber }) => ({ ETag, PartNumber })),
      },
    });

    const response = await this.executeS3Command(
      () => this.client.send(command),
      'Failed to complete multipart upload',
    );

    return {
      location: response.Location,
      bucket: response.Bucket,
      key: response.Key,
      etag: response.ETag,
      versionId: response.VersionId,
    };
  }

  /**
   * Abort a multipart upload and clean up uploaded parts.
   * @param bucket - S3 bucket name
   * @param key - Object key (use the prefixed key from initiateMultipartUpload)
   * @param uploadId - Upload ID from initiateMultipartUpload
   */
  async abortMultipartUpload(bucket: string, key: string, uploadId: string): Promise<MultipartUploadAbortion> {
    const command = new AbortMultipartUploadCommand({
      Bucket: bucket,
      Key: key,
      UploadId: uploadId,
    });

    await this.executeS3Command(() => this.client.send(command), 'Failed to abort multipart upload');

    return {
      success: true,
      message: 'Multipart upload aborted successfully',
    };
  }

  /**
   * List uploaded parts of a multipart upload.
   * @param bucket - S3 bucket name
   * @param key - Object key (use the prefixed key from initiateMultipartUpload)
   * @param uploadId - Upload ID from initiateMultipartUpload
   * @param maxParts - Maximum number of parts to return
   * @param partNumberMarker - Part number to start listing from
   */
  async listParts(
    bucket: string,
    key: string,
    uploadId: string,
    maxParts?: number,
    partNumberMarker?: number,
  ): Promise<ListPartsResult> {
    const command = new ListPartsCommand({
      Bucket: bucket,
      Key: key,
      UploadId: uploadId,
      MaxParts: maxParts,
      PartNumberMarker: partNumberMarker?.toString(),
    });

    const response = await this.executeS3Command(() => this.client.send(command), 'Failed to list parts');

    if (!response.Bucket || !response.Key || !response.UploadId) {
      throw new BadRequestException('Invalid response from S3: missing required fields');
    }

    return {
      bucket: response.Bucket,
      key: response.Key,
      uploadId: response.UploadId,
      parts: response.Parts || [],
      maxParts: response.MaxParts,
      isTruncated: response.IsTruncated,
      partNumberMarker: response.PartNumberMarker,
      nextPartNumberMarker: response.NextPartNumberMarker,
      storageClass: response.StorageClass,
    };
  }

  /**
   * Calculate optimal part size for a given file size.
   *
   * Priority order for part size determination:
   * 1. preferredPartSize parameter (highest priority)
   * 2. Module configuration defaultPartSize
   * 3. AWS minimum 5MB (fallback)
   *
   * Automatically adjusts part size to stay within AWS's 10,000 part limit.
   *
   * @param fileSize - Total file size in bytes (must be > 0)
   * @param preferredPartSize - Optional preferred part size in bytes (must be >= 5MB)
   * @returns Object containing calculated partSize and totalParts
   * @throws BadRequestException if fileSize less than 0 or preferredPartSize less than 5MB
   *
   * @example
   * // Use module default (or AWS minimum if not configured)
   * calculatePartSize(100 * 1024 * 1024);
   *
   * @example
   * // Override with 50MB parts for better performance
   * calculatePartSize(100 * 1024 * 1024, 50 * 1024 * 1024);
   */
  calculatePartSize(fileSize: number, preferredPartSize?: number): PartSizeCalculation {
    if (fileSize <= 0) {
      throw new BadRequestException('File size must be greater than 0');
    }

    const { MIN_PART_SIZE, MAX_PARTS } = MultipartUploadService.CONSTRAINTS;

    // Validate preferred part size if provided
    if (preferredPartSize !== undefined && preferredPartSize < MIN_PART_SIZE) {
      throw new BadRequestException(`Preferred part size must be at least ${MIN_PART_SIZE} bytes (5MB)`);
    }

    // Priority: function param > config > AWS minimum
    let partSize = preferredPartSize ?? this.defaultPartSize;
    let totalParts = Math.ceil(fileSize / partSize);

    // Auto-adjust if exceeds AWS max parts limit
    if (totalParts > MAX_PARTS) {
      partSize = Math.ceil(fileSize / MAX_PARTS);
      totalParts = Math.ceil(fileSize / partSize);
    }

    return { partSize, totalParts };
  }

  // Private helper methods

  /**
   * Validate and retrieve the default part size from configuration.
   * @throws Error if configured part size is below AWS minimum
   */
  private validateAndGetDefaultPartSize(): number {
    const { MIN_PART_SIZE } = MultipartUploadService.CONSTRAINTS;
    const configuredPartSize = this.options.multipartUpload?.defaultPartSize;

    if (configuredPartSize !== undefined && configuredPartSize < MIN_PART_SIZE) {
      throw new Error(
        `Configured defaultPartSize (${configuredPartSize}) must be at least ${MIN_PART_SIZE} bytes (5MB)`,
      );
    }

    return configuredPartSize || MIN_PART_SIZE;
  }

  /**
   * Execute an S3 operation with standardized error handling.
   * @param operation - Function that returns a promise
   * @param errorMessage - Base error message for context
   */
  private async executeS3Command<T>(operation: () => Promise<T>, errorMessage: string): Promise<T> {
    try {
      return await operation();
    } catch (error) {
      if (error instanceof BadRequestException) {
        throw error;
      }
      throw new BadRequestException(`${errorMessage}: ${error.message}`);
    }
  }

  /**
   * Validate that a part number is within AWS S3 constraints.
   * @param partNumber - Part number to validate
   * @throws BadRequestException if part number is invalid
   */
  private validatePartNumber(partNumber: number): void {
    const { MIN_PART_NUMBER, MAX_PARTS } = MultipartUploadService.CONSTRAINTS;

    if (!Number.isInteger(partNumber) || partNumber < MIN_PART_NUMBER || partNumber > MAX_PARTS) {
      throw new BadRequestException(`Part number must be an integer between ${MIN_PART_NUMBER} and ${MAX_PARTS}`);
    }
  }

  /**
   * Validate parts array for multipart upload completion.
   * Ensures parts are non-empty, sorted, unique, and within AWS limits.
   * @param parts - Array of upload parts to validate
   * @throws BadRequestException if validation fails
   */
  private validateParts(parts: UploadPart[]): void {
    const { MAX_PARTS } = MultipartUploadService.CONSTRAINTS;

    if (!parts?.length) {
      throw new BadRequestException('Parts array cannot be empty');
    }

    if (parts.length > MAX_PARTS) {
      throw new BadRequestException(`Cannot upload more than ${MAX_PARTS} parts`);
    }

    // Validate all parts in a single efficient pass
    const partNumbers = new Set<number>();
    let previousPartNumber = 0;

    for (const [index, { ETag, PartNumber }] of parts.entries()) {
      // Validate required fields
      if (!ETag) {
        throw new BadRequestException(`Part at index ${index} is missing ETag`);
      }

      // Validate part number range
      this.validatePartNumber(PartNumber);

      // Check for duplicates
      if (partNumbers.has(PartNumber)) {
        throw new BadRequestException('Duplicate part numbers detected');
      }
      partNumbers.add(PartNumber);

      // Ensure ascending order
      if (PartNumber <= previousPartNumber) {
        throw new BadRequestException('Parts must be sorted by PartNumber in ascending order');
      }
      previousPartNumber = PartNumber;
    }
  }
}
