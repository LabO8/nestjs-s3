import { S3Client } from '@aws-sdk/client-s3';
import { Test } from '@nestjs/testing';
import { S3Config, S3Module, S3_SERVICE } from '../../src';

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
});
