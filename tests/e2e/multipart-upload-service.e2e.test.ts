import { Test, TestingModule } from '@nestjs/testing';
import { v4 as uuidv4 } from 'uuid';
import axios from 'axios';
import { BucketsService, MultipartUploadService, ObjectsService, S3Module, UploadPart } from '../../src';
import {
  S3Client,
  PutBucketVersioningCommand,
  ListObjectVersionsCommand,
  DeleteObjectsCommand,
} from '@aws-sdk/client-s3';

describe('MultipartUploadService (e2e)', () => {
  let testingModule: TestingModule;
  let multipartUploadService: MultipartUploadService;
  let bucketService: BucketsService;
  let objectsService: ObjectsService;
  let s3Client: S3Client;

  const bucketName = uuidv4();
  const TEST_PREFIX = 'test/';
  const DEFAULT_TIMEOUT = 60000;

  // Helper functions
  const generateKey = (suffix: string) => `multipart-${suffix}-${uuidv4()}.txt`;

  const createTestBuffer = (size: number, char = 'a') => Buffer.from(char.repeat(size));

  const uploadPart = async (url: string, data: Buffer, contentType = 'text/plain') => {
    const response = await axios.put(url, data, {
      headers: { 'Content-Type': contentType },
    });
    return response.headers.etag;
  };

  const initiateUpload = async (key: string, options = {}) => {
    return multipartUploadService.initiateMultipartUpload(bucketName, key, {
      ContentType: 'text/plain',
      ...options,
    });
  };

  const cleanupUpload = async (key: string, uploadId: string) => {
    try {
      await multipartUploadService.abortMultipartUpload(bucketName, key, uploadId);
    } catch {
      // Ignore cleanup errors
    }
  };

  const cleanupObject = async (key: string) => {
    try {
      await objectsService.deleteObject(bucketName, key);
    } catch {
      // Ignore cleanup errors
    }
  };

  beforeAll(async () => {
    testingModule = await Test.createTestingModule({
      imports: [
        S3Module.forRoot({
          region: process.env.AWS_REGION ?? '',
          accessKeyId: process.env.AWS_ACCESS_KEY_ID ?? '',
          secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY ?? '',
          prefix: TEST_PREFIX,
        }),
      ],
    }).compile();

    multipartUploadService = testingModule.get(MultipartUploadService);
    bucketService = testingModule.get(BucketsService);
    objectsService = testingModule.get(ObjectsService);

    s3Client = new S3Client({
      region: process.env.AWS_REGION,
      credentials: {
        accessKeyId: process.env.AWS_ACCESS_KEY_ID ?? '',
        secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY ?? '',
      },
    });

    await bucketService.create(bucketName);

    // Enable versioning
    await s3Client.send(
      new PutBucketVersioningCommand({
        Bucket: bucketName,
        VersioningConfiguration: { Status: 'Enabled' },
      }),
    );
  });

  afterAll(async () => {
    // Clean up all object versions
    try {
      let keyMarker: string | undefined;
      let versionIdMarker: string | undefined;

      do {
        const listedVersions = await s3Client.send(
          new ListObjectVersionsCommand({
            Bucket: bucketName,
            KeyMarker: keyMarker,
            VersionIdMarker: versionIdMarker,
          }),
        );

        const objectsToDelete = [
          ...(listedVersions.Versions?.map((v) => ({ Key: v.Key!, VersionId: v.VersionId! })) || []),
          ...(listedVersions.DeleteMarkers?.map((d) => ({ Key: d.Key!, VersionId: d.VersionId! })) || []),
        ];

        if (objectsToDelete.length > 0) {
          await s3Client.send(
            new DeleteObjectsCommand({
              Bucket: bucketName,
              Delete: { Objects: objectsToDelete },
            }),
          );
        }

        keyMarker = listedVersions.NextKeyMarker;
        versionIdMarker = listedVersions.NextVersionIdMarker;
      } while (keyMarker);
    } catch {
      // Ignore cleanup errors
    }

    await bucketService.delete(bucketName);

    // Destroy S3 client connection
    s3Client.destroy();

    // Close NestJS testing module
    await testingModule.close();
  });

  describe('initiateMultipartUpload', () => {
    it('should successfully initiate a multipart upload', async () => {
      const key = generateKey('init');
      const result = await initiateUpload(key, {
        Metadata: { testMetadata: 'test-value' },
      });

      expect(result).toBeDefined();
      expect(result.uploadId).toBeDefined();
      expect(result.key).toBe(`${TEST_PREFIX}${key}`);
      expect(result.bucket).toBe(bucketName);

      await cleanupUpload(result.key, result.uploadId);
    });

    it('should handle errors when bucket does not exist', async () => {
      const key = generateKey('error');
      const nonExistentBucket = `non-existent-bucket-${uuidv4()}`;

      await expect(multipartUploadService.initiateMultipartUpload(nonExistentBucket, key)).rejects.toThrow();
    });

    it('should respect disableAutoPrefix option', async () => {
      const key = `test/multipart-no-prefix-${uuidv4()}.txt`;
      const result = await initiateUpload(key, { disableAutoPrefix: true });

      expect(result.key).toBe(key);

      await cleanupUpload(result.key, result.uploadId);
    });

    it('should apply custom prefix context', async () => {
      const key = generateKey('custom-prefix');
      const result = await initiateUpload(key, {
        prefixContext: { customPrefix: 'custom-path/' },
      });

      expect(result.uploadId).toBeDefined();
      expect(result.key).toContain(key);

      await cleanupUpload(result.key, result.uploadId);
    });
  });

  describe('getUploadPartPresignedUrl', () => {
    it('should generate presigned URLs for upload parts', async () => {
      const key = generateKey('presigned');
      const initResult = await initiateUpload(key);

      const [presignedUrl1, presignedUrl2] = await Promise.all([
        multipartUploadService.getUploadPartPresignedUrl(bucketName, initResult.key, initResult.uploadId, 1, 3600),
        multipartUploadService.getUploadPartPresignedUrl(bucketName, initResult.key, initResult.uploadId, 2, 3600),
      ]);

      expect(presignedUrl1.url).toContain('X-Amz-Algorithm');
      expect(presignedUrl1.partNumber).toBe(1);
      expect(presignedUrl1.uploadId).toBe(initResult.uploadId);
      expect(presignedUrl2.partNumber).toBe(2);

      await cleanupUpload(initResult.key, initResult.uploadId);
    });

    it('should throw error for invalid part numbers', async () => {
      const key = generateKey('invalid-part');
      const initResult = await initiateUpload(key);

      await expect(
        multipartUploadService.getUploadPartPresignedUrl(bucketName, initResult.key, initResult.uploadId, 0),
      ).rejects.toThrow();

      await expect(
        multipartUploadService.getUploadPartPresignedUrl(bucketName, initResult.key, initResult.uploadId, 10001),
      ).rejects.toThrow();

      await cleanupUpload(initResult.key, initResult.uploadId);
    });
  });

  describe('completeMultipartUpload', () => {
    const MB = 1024 * 1024;

    it('should complete a multipart upload successfully', async () => {
      jest.setTimeout(DEFAULT_TIMEOUT);

      const key = generateKey('complete');
      const initResult = await initiateUpload(key);

      // Upload 2 parts
      const parts = await Promise.all([
        (async () => {
          const url = await multipartUploadService.getUploadPartPresignedUrl(
            bucketName,
            initResult.key,
            initResult.uploadId,
            1,
          );
          const etag = await uploadPart(url.url, createTestBuffer(5 * MB, 'a'));
          return { ETag: etag, PartNumber: 1 };
        })(),
        (async () => {
          const url = await multipartUploadService.getUploadPartPresignedUrl(
            bucketName,
            initResult.key,
            initResult.uploadId,
            2,
          );
          const etag = await uploadPart(url.url, createTestBuffer(5 * MB, 'b'));
          return { ETag: etag, PartNumber: 2 };
        })(),
      ]);

      const result = await multipartUploadService.completeMultipartUpload(
        bucketName,
        initResult.key,
        initResult.uploadId,
        parts,
      );

      expect(result.key).toBe(initResult.key);
      expect(result.etag).toBeDefined();

      // Verify object exists
      const getResult = await objectsService.getObject(bucketName, key);
      expect(getResult).toBeDefined();

      await cleanupObject(key);
    });

    it('should return versionId when completing upload on versioned bucket', async () => {
      jest.setTimeout(DEFAULT_TIMEOUT);

      const key = generateKey('versioned');
      const initResult = await initiateUpload(key);

      const presignedUrl = await multipartUploadService.getUploadPartPresignedUrl(
        bucketName,
        initResult.key,
        initResult.uploadId,
        1,
      );

      const etag = await uploadPart(presignedUrl.url, createTestBuffer(5 * MB, 'z'));
      const parts: UploadPart[] = [{ ETag: etag, PartNumber: 1 }];

      const result = await multipartUploadService.completeMultipartUpload(
        bucketName,
        initResult.key,
        initResult.uploadId,
        parts,
      );

      expect(result.etag).toBeDefined();
      expect(result.versionId).toBeDefined();
      expect(result.versionId).toBeTruthy();

      await cleanupObject(key);
    });

    describe('validation errors', () => {
      let initResult: Awaited<ReturnType<typeof initiateUpload>>;

      beforeEach(async () => {
        const key = generateKey('validation');
        initResult = await initiateUpload(key);
      });

      afterEach(async () => {
        await cleanupUpload(initResult.key, initResult.uploadId);
      });

      it('should throw error for empty parts array', async () => {
        await expect(
          multipartUploadService.completeMultipartUpload(bucketName, initResult.key, initResult.uploadId, []),
        ).rejects.toThrow('Parts array cannot be empty');
      });

      it('should throw error for unsorted parts', async () => {
        const parts: UploadPart[] = [
          { ETag: '"etag2"', PartNumber: 2 },
          { ETag: '"etag1"', PartNumber: 1 },
        ];

        await expect(
          multipartUploadService.completeMultipartUpload(bucketName, initResult.key, initResult.uploadId, parts),
        ).rejects.toThrow('Parts must be sorted by PartNumber in ascending order');
      });

      it('should throw error for duplicate part numbers', async () => {
        const parts: UploadPart[] = [
          { ETag: '"etag1"', PartNumber: 1 },
          { ETag: '"etag1-duplicate"', PartNumber: 1 },
        ];

        await expect(
          multipartUploadService.completeMultipartUpload(bucketName, initResult.key, initResult.uploadId, parts),
        ).rejects.toThrow('Duplicate part numbers detected');
      });
    });
  });

  describe('abortMultipartUpload', () => {
    it('should abort a multipart upload successfully', async () => {
      const key = generateKey('abort');
      const initResult = await initiateUpload(key);

      const result = await multipartUploadService.abortMultipartUpload(bucketName, initResult.key, initResult.uploadId);

      expect(result.success).toBe(true);
      expect(result.message).toBe('Multipart upload aborted successfully');
    });

    it('should handle errors when aborting non-existent upload', async () => {
      const key = `test/multipart-abort-error-${uuidv4()}.txt`;
      const fakeUploadId = 'fake-upload-id-12345';

      await expect(multipartUploadService.abortMultipartUpload(bucketName, key, fakeUploadId)).rejects.toThrow();
    });
  });

  describe('listParts', () => {
    it('should list uploaded parts', async () => {
      jest.setTimeout(DEFAULT_TIMEOUT);

      const key = generateKey('list-parts');
      const initResult = await initiateUpload(key);

      const presignedUrl = await multipartUploadService.getUploadPartPresignedUrl(
        bucketName,
        initResult.key,
        initResult.uploadId,
        1,
      );

      await uploadPart(presignedUrl.url, createTestBuffer(5 * 1024 * 1024, 'x'));

      const result = await multipartUploadService.listParts(bucketName, initResult.key, initResult.uploadId);

      expect(result.uploadId).toBe(initResult.uploadId);
      expect(result.parts).toHaveLength(1);
      expect(result.parts[0].PartNumber).toBe(1);
      expect(result.parts[0].ETag).toBeDefined();
      expect(result.parts[0].Size).toBe(5 * 1024 * 1024);

      await cleanupUpload(initResult.key, initResult.uploadId);
    });

    it('should return empty array when no parts uploaded', async () => {
      const key = generateKey('no-parts');
      const initResult = await initiateUpload(key);

      const result = await multipartUploadService.listParts(bucketName, initResult.key, initResult.uploadId);

      expect(result.parts).toHaveLength(0);

      await cleanupUpload(initResult.key, initResult.uploadId);
    });

    it('should handle errors when listing parts for non-existent upload', async () => {
      const key = `test/multipart-list-error-${uuidv4()}.txt`;
      const fakeUploadId = 'fake-upload-id-67890';

      await expect(multipartUploadService.listParts(bucketName, key, fakeUploadId)).rejects.toThrow();
    });
  });

  describe('calculatePartSize', () => {
    const MB = 1024 * 1024;
    const GB = 1024 * MB;
    const MIN_PART_SIZE = 5 * MB;
    const MAX_PARTS = 10000;

    it('should calculate correct part size for small files', () => {
      const result = multipartUploadService.calculatePartSize(10 * MB);

      expect(result.partSize).toBe(MIN_PART_SIZE);
      expect(result.totalParts).toBe(2);
    });

    it('should calculate correct part size for large files', () => {
      const result = multipartUploadService.calculatePartSize(100 * GB);

      expect(result.totalParts).toBeLessThanOrEqual(MAX_PARTS);
      expect(result.partSize).toBeGreaterThanOrEqual(MIN_PART_SIZE);
    });

    it('should throw error for zero or negative file size', () => {
      expect(() => multipartUploadService.calculatePartSize(0)).toThrow('File size must be greater than 0');
      expect(() => multipartUploadService.calculatePartSize(-100)).toThrow('File size must be greater than 0');
    });

    it('should use preferredPartSize when provided', () => {
      const preferredPartSize = 10 * MB;
      const result = multipartUploadService.calculatePartSize(100 * MB, preferredPartSize);

      expect(result.partSize).toBe(preferredPartSize);
      expect(result.totalParts).toBe(10);
    });

    it('should throw error if preferredPartSize is less than AWS minimum', () => {
      const invalidPartSize = 3 * MB;

      expect(() => multipartUploadService.calculatePartSize(100 * MB, invalidPartSize)).toThrow(
        'Preferred part size must be at least',
      );
    });

    it('should auto-adjust preferredPartSize if it exceeds max parts limit', () => {
      const result = multipartUploadService.calculatePartSize(100 * GB, MIN_PART_SIZE);

      expect(result.totalParts).toBeLessThanOrEqual(MAX_PARTS);
      expect(result.partSize).toBeGreaterThan(MIN_PART_SIZE);
    });

    it('should use configured default from module options', () => {
      const result = multipartUploadService.calculatePartSize(50 * MB);

      expect(result.partSize).toBe(MIN_PART_SIZE);
      expect(result.totalParts).toBe(10);
    });
  });

  describe('Full workflow integration', () => {
    it('should complete full multipart upload workflow', async () => {
      jest.setTimeout(90000);

      const key = generateKey('full-workflow');
      const MB = 1024 * 1024;
      const fileSize = 15 * MB;

      // Step 1: Initiate
      const initResult = await initiateUpload(key, {
        Metadata: { description: 'Full workflow test' },
      });

      expect(initResult.uploadId).toBeDefined();
      expect(initResult.key).toBe(`${TEST_PREFIX}${key}`);

      // Step 2: Calculate part size
      const { partSize, totalParts } = multipartUploadService.calculatePartSize(fileSize);
      expect(totalParts).toBe(3);

      // Step 3: Upload parts in parallel
      const uploadedParts = await Promise.all(
        Array.from({ length: totalParts }, async (_, index) => {
          const partNumber = index + 1;
          const presignedUrl = await multipartUploadService.getUploadPartPresignedUrl(
            bucketName,
            initResult.key,
            initResult.uploadId,
            partNumber,
          );

          const partData = createTestBuffer(partSize, String.fromCharCode(96 + partNumber));
          const etag = await uploadPart(presignedUrl.url, partData);

          return { ETag: etag, PartNumber: partNumber };
        }),
      );

      // Step 4: List parts to verify
      const listResult = await multipartUploadService.listParts(bucketName, initResult.key, initResult.uploadId);
      expect(listResult.parts).toHaveLength(totalParts);

      // Step 5: Complete upload
      const completeResult = await multipartUploadService.completeMultipartUpload(
        bucketName,
        initResult.key,
        initResult.uploadId,
        uploadedParts,
      );

      expect(completeResult.etag).toBeDefined();
      expect(completeResult.key).toBe(initResult.key);

      // Step 6: Verify object
      const getResult = await objectsService.getObject(bucketName, key);
      expect(getResult.ContentLength).toBe(fileSize);
      expect(getResult.ContentType).toBe('text/plain');
      expect(getResult.Metadata?.description).toBe('Full workflow test');

      await cleanupObject(key);
    });
  });
});
