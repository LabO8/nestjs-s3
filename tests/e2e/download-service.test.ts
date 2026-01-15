import { Test, TestingModule } from '@nestjs/testing';
import * as fs from 'fs';
import * as path from 'path';
import { v4 as uuidv4 } from 'uuid';
import { MissingDownloadDirectoryException } from '../../src/exceptions';
import { S3Module } from '../../src/s3.module';
import { BucketsService, ObjectsService } from '../../src/services';
import { DownloadService } from '../../src/utils';

describe('Download util service', () => {
  let testingModule!: TestingModule;
  let downloadService!: DownloadService;
  let objectService!: ObjectsService;
  let bucketService!: BucketsService;

  const testBucket = uuidv4();
  const remote = 'test-download.txt';
  const testPath = path.resolve(__dirname, 'data');
  const downloadPath = path.resolve(__dirname, 'downloads');

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

    downloadService = testingModule.get(DownloadService);
    objectService = testingModule.get(ObjectsService);
    bucketService = testingModule.get(BucketsService);

    await bucketService.create(testBucket);
    await objectService.putObjectFromPath(testBucket, path.resolve(testPath, 'test.txt'), remote);
  });

  afterAll(async () => {
    await objectService.deleteObject(testBucket, remote);
    await bucketService.delete(testBucket);
  });

  it('can download an object from a existng bucket', async () => {
    jest.setTimeout(30000);

    const result = await downloadService.download(testBucket, remote, downloadPath);

    expect(result).toEqual(path.resolve(downloadPath, remote));
    expect(fs.existsSync(result)).toBeTruthy();
  });

  it('can download an object from a existng bucket and create local path', async () => {
    jest.setTimeout(30000);

    const result = await downloadService.download(testBucket, remote, path.resolve(downloadPath, 'd'));

    expect(result).toEqual(path.resolve(path.resolve(downloadPath, 'd'), remote));
    expect(fs.existsSync(result)).toBeTruthy();
  });

  it('can not download an object from a existng bucket if the download path does not exists and cannot create it', async () => {
    jest.setTimeout(30000);

    await expect(
      downloadService.download(testBucket, remote, path.resolve(downloadPath, 't'), {
        createPath: false,
      }),
    ).rejects.toThrow(MissingDownloadDirectoryException);
  });

  it('can not download an object from a existng bucket if the download path does not exists and cannot create if it does not have permissions', async () => {
    jest.setTimeout(30000);

    await expect(downloadService.download(testBucket, remote, '/etc/tt')).rejects.toThrow();
  });

  it('can not download an object that does not exist', async () => {
    jest.setTimeout(30000);

    await expect(downloadService.download(testBucket, 'TTTT.txt', downloadPath)).rejects.toThrow();
  });
});
