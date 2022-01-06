import { DynamicModule, Global, Module, Provider } from '@nestjs/common';
import { S3_CONFIG } from './constants';
import { createS3ServiceProvider } from './s3-service.factory';
import { BucketsService, ObjectsService, PrefixService, PreSignedUrlService } from './services';
import { S3AsyncConfig, S3Config } from './types';

const proviers: Provider[] = [
  createS3ServiceProvider(),
  BucketsService,
  ObjectsService,
  PrefixService,
  PreSignedUrlService,
];

const createSharedProviders = (config: S3Config): Provider[] => [
  {
    provide: S3_CONFIG,
    useValue: config,
  },
  ...proviers,
];

const createSharedProvidersAsync = (provider: S3AsyncConfig): Provider[] => [
  {
    provide: S3_CONFIG,
    useFactory: provider.useFactory,
    inject: provider.inject || [],
  },
  ...proviers,
];

@Global()
@Module({})
export class S3Module {
  static forRoot(config: S3Config): DynamicModule {
    return {
      module: S3Module,
      global: true,
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
