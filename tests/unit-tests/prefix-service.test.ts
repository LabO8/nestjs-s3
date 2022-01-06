import { Test, TestingModule } from '@nestjs/testing';
import { S3Module } from '../../src';
import { PrefixService } from '../../src/services';

describe('Prefix service', () => {
  let testingModule!: TestingModule;
  let prefixService!: PrefixService;

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

    prefixService = testingModule.get(PrefixService);
  });

  it('should be able to prefix a file based on configuration', async () => {
    expect(prefixService.prefix('test.txt')).toEqual('test/test.txt');
  });
});
