import { DynamicModule, Global, Module, Provider } from '@nestjs/common';
import { BucketsModule } from './buckets/buckets.module';
import { S3_CONFIG } from './constants';
import { createS3ServiceProvider } from './s3-service.factory';
import { S3AsyncConfig, S3Config } from './types';

const createSharedProviders = (config: S3Config): Provider[] => [
  {
    provide: S3_CONFIG,
    useValue: config,
  },
  createS3ServiceProvider(),
];

const createSharedProvidersAsync = (provider: S3AsyncConfig): Provider[] => [
  {
    provide: S3_CONFIG,
    useFactory: provider.useFactory,
    inject: provider.inject || [],
  },
  createS3ServiceProvider(),
];

@Global()
@Module({
  imports: [BucketsModule],
})
export class S3Module {
  static forRoot(config: S3Config): DynamicModule {
    return {
      module: S3Module,
      global: true,
      imports: [BucketsModule],
      providers: [...createSharedProviders(config)],
      exports: [...createSharedProviders(config)],
    };
  }

  static forRootAsync(provider: S3AsyncConfig): DynamicModule {
    return {
      module: S3Module,
      global: true,
      providers: [...createSharedProvidersAsync(provider), ...(provider.providers || [])],
      imports: [...(provider.imports || [])],
      exports: [...createSharedProvidersAsync(provider)],
    };
  }
}
