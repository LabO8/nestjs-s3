import { CreateMultipartUploadCommandInput, Part } from '@aws-sdk/client-s3';
import { DisableAutoPrefix, PrefixContext } from './prefix.type';

export type MultipartUploadOptions = Omit<CreateMultipartUploadCommandInput, 'Bucket' | 'Key'> &
  DisableAutoPrefix &
  PrefixContext;

export type UploadPart = Required<Pick<Part, 'ETag' | 'PartNumber'>>;

export type MultipartUploadInitiation = {
  uploadId: string;
  key: string;
  bucket: string;
};

export type PresignedUploadUrl = {
  url: string;
  partNumber: number;
  uploadId: string;
};

export type MultipartUploadCompletion = {
  location?: string;
  bucket?: string;
  key?: string;
  etag?: string;
  versionId?: string;
};

export type MultipartUploadAbortion = {
  success: boolean;
  message: string;
};

export type ListPartsResult = {
  bucket: string;
  key: string;
  uploadId: string;
  parts: Part[];
  maxParts?: number;
  isTruncated?: boolean;
  partNumberMarker?: string;
  nextPartNumberMarker?: string;
  storageClass?: string;
};

export type PartSizeCalculation = {
  partSize: number;
  totalParts: number;
};
