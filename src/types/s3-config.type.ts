import { Abstract, Type } from '@nestjs/common';
import { ModuleMetadata } from '@nestjs/common/interfaces';
import { IPrefixAlgorithm } from '../interfaces';

export type S3Config = {
  region: string;
  accessKeyId: string;
  secretAccessKey: string;
  prefix?: string;
  endPoint?: string;
  prefixAlgorithm?: IPrefixAlgorithm;
  useAccelerateEndpoint?: boolean;
};

export type S3AsyncConfig = Pick<ModuleMetadata, 'imports' | 'providers'> & {
  useFactory: (...args: any[]) => Promise<Omit<S3Config, 'prefixAlgorithm'>> | Omit<S3Config, 'prefixAlgorithm'>;
  inject?: Array<Type<unknown> | string | symbol | Abstract<unknown>>;
  prefixAlgorithmFactory?: (...args: any[]) => Promise<IPrefixAlgorithm> | IPrefixAlgorithm;
  prefixAlgorithmInject?: Array<Type<unknown> | string | symbol | Abstract<unknown>>;
};
