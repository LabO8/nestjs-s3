import { S3Client } from '@aws-sdk/client-s3';
import { Provider } from '@nestjs/common';
import { S3_CONFIG, S3_SERVICE } from './constants';
import { S3Config } from './types';

export const createS3ServiceProvider = (): Provider => ({
  provide: S3_SERVICE,
  inject: [S3_CONFIG],
  useFactory: (config: S3Config) =>
    new S3Client({
      endpoint: config.endPoint ?? null,
      region: config.region,
      credentials: {
        accessKeyId: config.accessKeyId,
        secretAccessKey: config.secretAccessKey,
      },
    }),
});
