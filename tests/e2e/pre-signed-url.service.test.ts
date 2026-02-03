import { Test, TestingModule } from '@nestjs/testing';
import { v4 as uuidv4 } from 'uuid';
import { S3Module } from '../../src/s3.module';
import { BucketsService, SignedUrlService } from '../../src/services';

describe('Pre signed url service', () => {
  let testingModule!: TestingModule;
  let presignedUrlService!: SignedUrlService;
  let bucketService!: BucketsService;

  const testBucket = uuidv4();

  beforeAll(async () => {
    testingModule = await Test.createTestingModule({
      imports: [
        S3Module.forRoot({
          region: process.env.AWS_REGION ?? '',
          accessKeyId: process.env.AWS_ACCESS_KEY_ID ?? '',
          secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY ?? '',
        }),
      ],
    }).compile();

    presignedUrlService = testingModule.get(SignedUrlService);
    bucketService = testingModule.get(BucketsService);

    await bucketService.create(testBucket);
  });

  afterAll(async () => {
    await bucketService.delete(testBucket);
    await testingModule.close();
  });

  it('can get a presigned put url with a existing bucket', async () => {
    const presignedUrl = await presignedUrlService.getPutSignedUrl(testBucket, 'test.txt');

    expect(presignedUrl.url).not.toBeNull();
    expect(presignedUrl.remote).toEqual('test.txt');
  });

  it('can get a presigned get url with a existing bucket', async () => {
    const presignedUrl = await presignedUrlService.getSignedUrl(testBucket, 'test.txt');

    expect(presignedUrl).not.toBeNull();
  });

  it('can get a delete presigned get url with a existing bucket', async () => {
    const presignedUrl = await presignedUrlService.getDeleteSignedUrl(testBucket, 'test.txt');

    expect(presignedUrl).not.toBeNull();
  });

  it('can get a delete objects presigned get url with a existing bucket', async () => {
    const presignedUrl = await presignedUrlService.getDeleteSignedUrl(testBucket, 'test.txt');

    expect(presignedUrl).not.toBeNull();
  });
});
