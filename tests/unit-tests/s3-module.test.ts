import { S3Client } from '@aws-sdk/client-s3';
import { Test } from '@nestjs/testing';
import { MultipartUploadService, S3Config, S3Module, S3_SERVICE } from '../../src';

describe('S3Module', () => {
  it('should create the s3 service with the passed settings', async () => {
    const testModule = await Test.createTestingModule({
      imports: [
        S3Module.forRoot({
          region: 'eu-west-1',
          accessKeyId: 'test',
          secretAccessKey: 'test',
        }),
      ],
    }).compile();

    const service = testModule.get(S3_SERVICE);
    expect(service).toBeInstanceOf(S3Client);
  });

  it('should create the s3 service with the async passed settings as promise', async () => {
    const testModule = await Test.createTestingModule({
      imports: [
        S3Module.forRootAsync({
          useFactory: () =>
            new Promise((resolve) => {
              resolve({
                region: 'eu-west-1',
                accessKeyId: 'test',
                secretAccessKey: 'test',
              });
            }),
        }),
      ],
    }).compile();

    const service = testModule.get(S3_SERVICE);
    expect(service).toBeInstanceOf(S3Client);
  });

  it('should create the s3 service with the async passed settings', async () => {
    const testModule = await Test.createTestingModule({
      imports: [
        S3Module.forRootAsync({
          useFactory: (config: S3Config) => config,
          inject: ['simple.config'],
          providers: [
            {
              provide: 'simple.config',
              useValue: {
                region: 'eu-west-1',
                accessKeyId: 'test',
                secretAccessKey: 'test',
              },
            },
          ],
        }),
      ],
    }).compile();

    const service = testModule.get(S3_SERVICE);
    expect(service).toBeInstanceOf(S3Client);
  });

  describe('multipartUpload configuration', () => {
    it('should configure custom defaultPartSize', async () => {
      const testModule = await Test.createTestingModule({
        imports: [
          S3Module.forRoot({
            region: 'eu-west-1',
            accessKeyId: 'test',
            secretAccessKey: 'test',
            multipartUpload: {
              defaultPartSize: 10 * 1024 * 1024, // 10MB
            },
          }),
        ],
      }).compile();

      const multipartService = testModule.get(MultipartUploadService);
      const fileSize = 50 * 1024 * 1024; // 50MB
      const result = multipartService.calculatePartSize(fileSize);

      expect(result.partSize).toBe(10 * 1024 * 1024); // Configured default (10MB)
      expect(result.totalParts).toBe(5);
    });

    it('should use AWS minimum (5MB) when no multipartUpload config provided', async () => {
      const testModule = await Test.createTestingModule({
        imports: [
          S3Module.forRoot({
            region: 'eu-west-1',
            accessKeyId: 'test',
            secretAccessKey: 'test',
            // No multipartUpload config
          }),
        ],
      }).compile();

      const multipartService = testModule.get(MultipartUploadService);
      const fileSize = 50 * 1024 * 1024; // 50MB
      const result = multipartService.calculatePartSize(fileSize);

      expect(result.partSize).toBe(5 * 1024 * 1024); // AWS minimum
      expect(result.totalParts).toBe(10);
    });

    it('should throw error if defaultPartSize is less than AWS minimum', async () => {
      await expect(async () => {
        await Test.createTestingModule({
          imports: [
            S3Module.forRoot({
              region: 'eu-west-1',
              accessKeyId: 'test',
              secretAccessKey: 'test',
              multipartUpload: {
                defaultPartSize: 3 * 1024 * 1024, // 3MB (less than 5MB minimum)
              },
            }),
          ],
        }).compile();
      }).rejects.toThrow('Configured defaultPartSize');
    });

    it('should support defaultPartSize in async configuration', async () => {
      const testModule = await Test.createTestingModule({
        imports: [
          S3Module.forRootAsync({
            useFactory: async () => ({
              region: 'eu-west-1',
              accessKeyId: 'test',
              secretAccessKey: 'test',
              multipartUpload: {
                defaultPartSize: 20 * 1024 * 1024, // 20MB
              },
            }),
          }),
        ],
      }).compile();

      const multipartService = testModule.get(MultipartUploadService);
      const fileSize = 100 * 1024 * 1024; // 100MB
      const result = multipartService.calculatePartSize(fileSize);

      expect(result.partSize).toBe(20 * 1024 * 1024); // Configured default (20MB)
      expect(result.totalParts).toBe(5);
    });
  });
});
