import { Abstract, Type } from '@nestjs/common';
import { ModuleMetadata } from '@nestjs/common/interfaces';
import { IPrefixAlgorithm } from '../interfaces';
import { S3ClientConfig } from '@aws-sdk/client-s3';

export type S3Config = {
  region: string;
  accessKeyId: string;
  secretAccessKey: string;
  prefix?: string;
  endPoint?: string;
  prefixAlgorithm?: IPrefixAlgorithm;
  s3ClientConfig?: Partial<S3ClientConfig>;
  multipartUpload?: {
    /**
     * Default part size for multipart uploads in bytes
     * Must be at least 5MB (5 * 1024 * 1024)
     * @default 5242880 (5MB)
     */
    defaultPartSize?: number;
  };
};

export type S3AsyncConfig = Pick<ModuleMetadata, 'imports' | 'providers'> & {
  useFactory: (...args: any[]) => Promise<Omit<S3Config, 'prefixAlgorithm'>> | Omit<S3Config, 'prefixAlgorithm'>;
  inject?: Array<Type<unknown> | string | symbol | Abstract<unknown>>;
  prefixAlgorithmFactory?: (...args: any[]) => Promise<IPrefixAlgorithm> | IPrefixAlgorithm;
  prefixAlgorithmInject?: Array<Type<unknown> | string | symbol | Abstract<unknown>>;
};
