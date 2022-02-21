import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { S3Module } from '../../src';
import { aws, AwsType } from './aws';
import {
  CreateBucketCommand,
  ListBucketCommand,
  ListObjectsCommand,
  UploadFileCommand,
} from './commands';

@Module({
  imports: [
    ConfigModule.forRoot({
      load: [aws],
    }),
    S3Module.forRootAsync({
      useFactory: (config: ConfigService) => {
        const awsConfig = config.get<AwsType>('aws');

        return {
          ...awsConfig,
          prefix: 'test-',
        };
      },
      imports: [ConfigModule],
      inject: [ConfigService],
    }),
  ],
  controllers: [],
  providers: [
    CreateBucketCommand,
    ListBucketCommand,
    ListObjectsCommand,
    UploadFileCommand,
  ],
})
export class AppModule {}
