import { Test, TestingModule } from '@nestjs/testing';
import { v4 as uuidv4 } from 'uuid';
import { S3Module } from '../../src';
import { BucketsService } from '../../src/services';

describe('Bucket service', () => {
  let testingModule!: TestingModule;
  let bucketService!: BucketsService;

  const testBucket = uuidv4();
  const testBucketCreate = uuidv4();

  beforeAll(async () => {
    testingModule = await Test.createTestingModule({
      imports: [
        S3Module.forRoot({
          region: process.env.AWS_REGION,
          accessKeyId: process.env.AWS_ACCESS_KEY_ID,
          secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
        }),
      ],
    }).compile();

    bucketService = testingModule.get(BucketsService);

    await bucketService.create(testBucket);
  });

  afterAll(async () => {
    await bucketService.delete(testBucketCreate);
    await bucketService.delete(testBucket);
  });

  it('should be able to view buckets', async () => {
    const buckets = await bucketService.list();

    expect(buckets.Buckets.length).toEqual(1);
  });

  it('should be able to create buckets', async () => {
    const bucket = await bucketService.create(testBucketCreate);

    expect(bucket.Location).toMatch(testBucketCreate);
  });

  it('should be able to delete a existing bucket', async () => {
    const bucketName = uuidv4();

    await bucketService.create(bucketName);

    await expect(bucketService.delete(bucketName)).resolves.not.toThrowError();
  });

  it('should not be able to delete bucket that does not exist', async () => {
    const bucketName = 'test-bucket-not-existing';

    await expect(bucketService.delete(bucketName)).rejects.toThrow();
  });

  it('should be able find a bucket by name', async () => {
    const bucket = await bucketService.find(testBucket);

    expect(bucket).not.toEqual(null);
  });

  it('should be not able find a bucket by name that does not exist', async () => {
    const bucket = await bucketService.find('test-not-found');

    expect(bucket).toEqual(undefined);
  });
});
