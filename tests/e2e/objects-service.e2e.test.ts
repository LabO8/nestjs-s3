import { Test, TestingModule } from '@nestjs/testing';
import * as fs from 'fs';
import * as path from 'path';
import { Stream } from 'stream';
import { v4 as uuidv4 } from 'uuid';
import { BucketsService, ObjectsService, S3Module } from '../../src';

describe('Object service', () => {
  let testingModule!: TestingModule;
  let objectService!: ObjectsService;
  let bucketService!: BucketsService;

  const bucketName = uuidv4();
  const testPath = path.resolve(__dirname, 'data');
  const testFiles = ['test.txt', 'test-file-path.txt', 'test-get.txt', 'test-file-to-copy.txt', 'test-file-copied.txt'];

  beforeAll(async () => {
    testingModule = await Test.createTestingModule({
      imports: [
        S3Module.forRoot({
          region: process.env.AWS_REGION,
          accessKeyId: process.env.AWS_ACCESS_KEY_ID,
          secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
          prefix: 'test/',
        }),
      ],
    }).compile();

    objectService = testingModule.get(ObjectsService);
    bucketService = testingModule.get(BucketsService);

    await bucketService.create(bucketName);
  });

  afterAll(async () => {
    await objectService.deleteObjects(bucketName, testFiles);
    await bucketService.delete(bucketName);
  });

  it('should be able to upload a file from a buffer to a bucket', async () => {
    jest.setTimeout(30000);

    const file = fs.readFileSync(path.resolve(testPath, 'test.txt'));

    const result = await objectService.putObject(bucketName, file, 'test.txt');

    expect(result).not.toEqual(null);
  });

  it('should be able to upload a file from a local path to a bucket', async () => {
    jest.setTimeout(30000);

    const result = await objectService.putObjectFromPath(
      bucketName,
      path.resolve(testPath, 'test.txt'),
      'test-file-path.txt',
    );

    expect(result).not.toEqual(null);
  });

  it('should be able to delete a file by remote from a bucket', async () => {
    await objectService.putObjectFromPath(bucketName, path.resolve(testPath, 'test.txt'), 'test-file-to-delete.txt');

    const result = await objectService.deleteObject(bucketName, 'test-file-to-delete.txt');

    expect(result).not.toEqual(null);
  });

  it('should be able to delete multipe files by remote from a bucket', async () => {
    await objectService.putObjectFromPath(bucketName, path.resolve(testPath, 'test.txt'), 'test-file-to-delete.txt');
    await objectService.putObjectFromPath(bucketName, path.resolve(testPath, 'test.txt'), 'test-file-to-delete-2.txt');

    const result = await objectService.deleteObjects(bucketName, [
      'test-file-to-delete.txt',
      'test-file-to-delete-2.txt',
    ]);

    expect(result).not.toEqual(null);
  });

  it('should get an object that exists from a existing bucket', async () => {
    const remote = 'test-get.txt';
    await objectService.putObjectFromPath(bucketName, path.resolve(testPath, 'test.txt'), remote);

    const object = await objectService.getObject(bucketName, remote);

    expect(object.Body).toBeInstanceOf(Stream);
  });

  it('should be able to copy a file by remote', async () => {
    await objectService.putObjectFromPath(bucketName, path.resolve(testPath, 'test.txt'), 'test-file-to-copy.txt');

    const result = await objectService.copyObject(
      bucketName,
      'test-file-to-copy.txt',
      bucketName,
      'test-file-copied.txt',
    );

    expect(result).not.toEqual(null);
  });
});
