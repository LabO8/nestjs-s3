import { DynamicModule, Module } from '@nestjs/common';
import { BucketsModule } from './buckets/buckets.module';
import { S3_CONFIG } from './constants';
import { createS3ServiceProvider } from './s3-service.factory';
import { S3AsyncConfig, S3Config } from './types';

@Module({
  imports: [BucketsModule],
})
export class S3Module {
  static forRoot(config: S3Config): DynamicModule {
    return {
      module: S3Module,
      providers: [
        {
          provide: S3_CONFIG,
          useValue: config,
        },
        createS3ServiceProvider(),
      ],
    };
  }

  static forRootAsync(provider: S3AsyncConfig): DynamicModule {
    return {
      module: S3Module,
      providers: [
        {
          provide: S3_CONFIG,
          useFactory: provider.useFactory,
          inject: provider.inject || [],
        },
        createS3ServiceProvider(),
        ...(provider.providers || []),
      ],
      imports: [...(provider.imports || [])],
    };
  }
}
