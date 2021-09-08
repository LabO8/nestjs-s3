import { Type, Abstract } from '@nestjs/common';
import { ModuleMetadata } from '@nestjs/common/interfaces';
import { S3Config } from './s3-config.type';

export type S3AsyncConfig = Pick<ModuleMetadata, 'imports' | 'providers'> & {
  useFactory: (...args: any[]) => Promise<S3Config> | S3Config;
  inject?: Array<Type<unknown> | string | symbol | Abstract<unknown>>;
};
