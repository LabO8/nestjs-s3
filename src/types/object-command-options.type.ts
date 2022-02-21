import {
  DeleteObjectCommandInput,
  DeleteObjectsCommandInput,
  GetObjectCommandInput,
  ListObjectsCommandInput,
  PutObjectCommandInput,
} from '@aws-sdk/client-s3';

export type GetObjectOptions = Omit<GetObjectCommandInput, 'Bucket' | 'Key'>;
export type DeleteObjectsOptions = Omit<DeleteObjectsCommandInput, 'Bucket' | 'Delete'>;
export type PutObjectOptions = Omit<PutObjectCommandInput, 'Bucket' | 'Body' | 'Key'>;
export type DeleteObjectOptions = Omit<DeleteObjectCommandInput, 'Bucket' | 'Key'>;
export type ListObjectOptions = Omit<ListObjectsCommandInput, 'Bucket'>;
