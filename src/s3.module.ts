import { HttpModule } from '@nestjs/axios';
import { DynamicModule, Global, Module, Provider } from '@nestjs/common';
import { PREFIX_ALGORITHM, S3_CONFIG } from './constants';
import { createS3ServiceProvider } from './s3-service.factory';
import {
  BucketsService,
  DefaultPrefixAlgorithmService,
  ObjectsService,
  PrefixService,
  SignedUrlService,
} from './services';
import { S3AsyncConfig, S3Config } from './types';
import { DeletionService, DownloadService } from './utils';

const providers: Provider[] = [
  createS3ServiceProvider(),
  BucketsService,
  ObjectsService,
  PrefixService,
  SignedUrlService,
  DownloadService,
  DeletionService,
];

const createSharedProviders = (config: S3Config): Provider[] => [
  {
    provide: S3_CONFIG,
    useValue: config,
  },
  {
    provide: PREFIX_ALGORITHM,
    useValue: config.prefixAlgorithm ? config.prefixAlgorithm : new DefaultPrefixAlgorithmService(),
  },
  ...providers,
];

const createSharedProvidersAsync = (provider: S3AsyncConfig): Provider[] => [
  {
    provide: S3_CONFIG,
    useFactory: provider.useFactory,
    inject: provider.inject || [],
  },
  {
    provide: PREFIX_ALGORITHM,
    useFactory: provider.prefixAlgorithmFactory
      ? provider.prefixAlgorithmFactory
      : () => new DefaultPrefixAlgorithmService(),
    inject: provider.prefixAlgorithmInject || [],
  },
  ...providers,
];

@Global()
@Module({
  imports: [HttpModule],
})
export class S3Module {
  static forRoot(config: S3Config): DynamicModule {
    return {
      module: S3Module,
      global: true,
      providers: [...createSharedProviders(config)],
      exports: [...createSharedProviders(config)],
      imports: [HttpModule],
    };
  }

  static forRootAsync(provider: S3AsyncConfig): DynamicModule {
    return {
      module: S3Module,
      global: true,
      providers: [...createSharedProvidersAsync(provider), ...(provider.providers || [])],
      imports: [...(provider.imports || [HttpModule])],
      exports: [...createSharedProvidersAsync(provider)],
    };
  }
}
