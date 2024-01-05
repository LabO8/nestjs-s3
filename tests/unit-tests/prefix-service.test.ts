import { Test, TestingModule } from '@nestjs/testing';
import { S3Module } from '../../src';
import { PrefixService } from '../../src/services';
import { IPrefixAlgorithm } from '../../src/interfaces';

describe('Prefix service default implementation', () => {
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

describe('Prefix service custom implementation', () => {
  let testingModule!: TestingModule;
  let prefixService!: PrefixService;

  beforeAll(async () => {
    class CustomPrefixService implements IPrefixAlgorithm {
      prefix(remote: string, prefix: string, bucket?: string): string {
        return `${bucket}/${prefix}${remote}`;
      }
    }

    testingModule = await Test.createTestingModule({
      imports: [
        S3Module.forRoot({
          region: process.env.AWS_REGION,
          accessKeyId: process.env.AWS_ACCESS_KEY_ID,
          secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
          prefix: 'test/',
          prefixAlgorithm: new CustomPrefixService(),
        }),
      ],
    }).compile();

    prefixService = testingModule.get(PrefixService);
  });

  it('should use the custom implementation', async () => {
    expect(prefixService.prefix('test.txt', 'test-bucket')).toEqual('test-bucket/test/test.txt');
  });
});

describe('Prefix service custom implementation with injection', () => {
  let testingModule!: TestingModule;
  let prefixService!: PrefixService;

  beforeAll(async () => {
    class CustomPrefixWithDIService implements IPrefixAlgorithm {
      public constructor(private readonly globalPrefix: string) {}

      prefix(remote: string, prefix: string, bucket?: string): string {
        return `${bucket}/${this.globalPrefix}${prefix}${remote}`;
      }
    }

    testingModule = await Test.createTestingModule({
      imports: [
        S3Module.forRootAsync({
          providers: [
            {
              provide: 'GLOBAL_PREFIX',
              useValue: 'global-prefix/',
            },
          ],
          prefixAlgorithmInject: ['GLOBAL_PREFIX'],
          prefixAlgorithmFactory: (globalPrefix: string) => new CustomPrefixWithDIService(globalPrefix),
          useFactory: () => ({
            region: process.env.AWS_REGION,
            accessKeyId: process.env.AWS_ACCESS_KEY_ID,
            secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
            prefix: 'test/',
          }),
        }),
      ],
    }).compile();

    prefixService = testingModule.get(PrefixService);
  });

  it('should use the custom implementation', async () => {
    expect(prefixService.prefix('test.txt', 'test-bucket')).toEqual('test-bucket/global-prefix/test/test.txt');
  });
});
