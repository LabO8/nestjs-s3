import { S3Client } from '@aws-sdk/client-s3';
import { Test, TestingModule } from '@nestjs/testing';
import { BucketsService, S3Module, S3_SERVICE } from '../../src';

describe('Bucket module', () => {
  let testingModule!: TestingModule;
  let s3Client!: S3Client;
  let bucketService!: BucketsService;

  beforeEach(async () => {
    testingModule = await Test.createTestingModule({
      imports: [
        S3Module.forRoot({
          region: 'eu-west-1',
          accessKeyId: 'test',
          secretAccessKey: 'test',
        }),
      ],
    }).compile();

    s3Client = testingModule.get(S3_SERVICE);
    bucketService = testingModule.get(BucketsService);
  });

  it('should be able to create a valid bucket module', async () => {
    const spy = jest.spyOn<S3Client, any>(s3Client, 'send');
    spy.mockResolvedValue({
      Buckets: [],
    });

    await bucketService.list();
    expect(spy).toBeCalled();
  });
});
