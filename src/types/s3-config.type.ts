import { Abstract, Type } from '@nestjs/common';
import { ModuleMetadata } from '@nestjs/common/interfaces';

export type S3Config = {
  region: string;
  accessKeyId: string;
  secretAccessKey: string;
  prefix?: string;
  endPoint?: string;
};

export type S3AsyncConfig = Pick<ModuleMetadata, 'imports' | 'providers'> & {
  useFactory: (...args: any[]) => Promise<S3Config> | S3Config;
  inject?: Array<Type<unknown> | string | symbol | Abstract<unknown>>;
};
