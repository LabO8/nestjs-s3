import {
  DeleteObjectCommandInput,
  DeleteObjectsCommandInput,
  GetObjectCommandInput,
  ListObjectsCommandInput,
  PutObjectCommandInput,
} from '@aws-sdk/client-s3';
import { DisableAutoPrefix } from './disable-auto-prefix.type';

export type GetObjectOptions = Omit<GetObjectCommandInput, 'Bucket' | 'Key'> & DisableAutoPrefix;
export type DeleteObjectsOptions = Omit<DeleteObjectsCommandInput, 'Bucket' | 'Delete'> & DisableAutoPrefix;
export type PutObjectOptions = Omit<PutObjectCommandInput, 'Bucket' | 'Body' | 'Key'> & DisableAutoPrefix;
export type DeleteObjectOptions = Omit<DeleteObjectCommandInput, 'Bucket' | 'Key'> & DisableAutoPrefix;
export type ListObjectOptions = Omit<ListObjectsCommandInput, 'Bucket'> & DisableAutoPrefix;
export type OptionsWithAutoPrefix = PutObjectOptions | DeleteObjectOptions | DeleteObjectsOptions | GetObjectOptions;
