import { Test, TestingModule } from '@nestjs/testing';
import * as path from 'path';
import { v4 as uuidv4 } from 'uuid';
import { BucketsService, DeletionService, ObjectsService, S3Module } from '../../src';

describe('Deletion service', () => {
  let testingModule!: TestingModule;
  let objectService!: ObjectsService;
  let deletionHelperService!: DeletionService;
  let bucketService!: BucketsService;

  const bucketName = uuidv4();
  const testPath = path.resolve(__dirname, 'data');

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
    deletionHelperService = testingModule.get(DeletionService);
    bucketService = testingModule.get(BucketsService);

    await bucketService.create(bucketName);
  });

  afterAll(async () => {
    await bucketService.delete(bucketName);
  });

  it('should be able to delete files recursively by prefix from a bucket', async () => {
    await objectService.putObjectFromPath(
      bucketName,
      path.resolve(testPath, 'test.txt'),
      'delete-prefix/test-file-to-delete.txt',
    );
    await objectService.putObjectFromPath(
      bucketName,
      path.resolve(testPath, 'test.txt'),
      'delete-prefix/test-file-to-delete-2.txt',
    );
    await objectService.putObjectFromPath(
      bucketName,
      path.resolve(testPath, 'test.txt'),
      'delete-prefix/nested/test-file-to-delete-2.txt',
    );

    const result = await deletionHelperService.deleteObjectsByPrefix(bucketName, 'delete-prefix');

    expect(result).not.toEqual(null);
  });

  it('should be able to delete paginated files recursively by prefix from a bucket', async () => {
    for (let i = 0; i < 10; i++) {
      await objectService.putObjectFromPath(
        bucketName,
        path.resolve(testPath, 'test.txt'),
        `delete-prefix1/test-file-to-delete-${i}.txt`,
      );
      await objectService.putObjectFromPath(
        bucketName,
        path.resolve(testPath, 'test.txt'),
        `delete-prefix1/nested/test-file-to-delete-${i}.txt`,
      );
    }

    const result = await deletionHelperService.deleteObjectsByPrefix(
      bucketName,
      'delete-prefix1',
      false,
      {},
      { MaxKeys: 10 },
    );

    expect(result).toEqual(true);
  });
});
