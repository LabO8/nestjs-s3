import {
  DeleteObjectCommandInput,
  DeleteObjectsCommandInput,
  GetObjectCommandInput,
  ListObjectsCommandInput,
  ListObjectsV2CommandInput,
  PutObjectCommandInput,
} from '@aws-sdk/client-s3';
import { DisableAutoPrefix, PrefixContext } from './prefix.type';

export type GetObjectOptions = Omit<GetObjectCommandInput, 'Bucket' | 'Key'> & DisableAutoPrefix & PrefixContext;
export type DeleteObjectsOptions = Omit<DeleteObjectsCommandInput, 'Bucket' | 'Delete'> &
  DisableAutoPrefix &
  PrefixContext;
export type PutObjectOptions = Omit<PutObjectCommandInput, 'Bucket' | 'Body' | 'Key'> &
  DisableAutoPrefix &
  PrefixContext;
export type DeleteObjectOptions = Omit<DeleteObjectCommandInput, 'Bucket' | 'Key'> & DisableAutoPrefix & PrefixContext;
export type CopyObjectOptions = Omit<PutObjectCommandInput, 'Bucket' | 'Key' | 'CopySource'> &
  DisableAutoPrefix &
  PrefixContext;
export type ListObjectsOptions = Omit<ListObjectsCommandInput, 'Bucket'>;
export type ListObjectsV2Options = Omit<ListObjectsV2CommandInput, 'Bucket'>;
export type OptionsWithAutoPrefix =
  | PutObjectOptions
  | DeleteObjectOptions
  | DeleteObjectsOptions
  | GetObjectOptions
  | CopyObjectOptions;
