import {
  CopyObjectCommand,
  CopyObjectOutput,
  DeleteObjectCommand,
  DeleteObjectOutput,
  DeleteObjectsCommand,
  DeleteObjectsOutput,
  GetObjectCommand,
  GetObjectOutput,
  ListObjectsCommand,
  ListObjectsOutput,
  ListObjectsV2Command,
  ListObjectsV2Output,
  PutObjectCommand,
  PutObjectOutput,
  S3Client,
} from '@aws-sdk/client-s3';
import { Inject, Injectable } from '@nestjs/common';
import * as fs from 'fs';
import { S3_SERVICE } from '../constants';
import {
  CopyObjectOptions,
  DeleteObjectOptions,
  DeleteObjectsOptions,
  DisableAutoPrefix,
  GetObjectOptions,
  ListObjectsOptions,
  ListObjectsV2Options,
  PrefixContext,
  PutObjectOptions,
} from '../types';
import { PrefixService } from './prefix.service';
import { prepareOptions } from '../helpers';

@Injectable()
export class ObjectsService {
  public constructor(
    @Inject(S3_SERVICE) private readonly client: S3Client,
    private readonly prefixService: PrefixService,
  ) {}

  public async putObject(
    bucket: string,
    body: Buffer,
    remote: string,
    options?: PutObjectOptions,
  ): Promise<PutObjectOutput> {
    const { disableAutoPrefix, prefixContext, options: preparedOptions } = prepareOptions(options);

    return this.client.send(
      new PutObjectCommand({
        Bucket: bucket,
        Body: body,
        Key: disableAutoPrefix ? remote : this.prefixService.prefix(remote, bucket, prefixContext),
        ...preparedOptions,
      }),
    );
  }

  public async putObjectFromPath(
    bucket: string,
    path: string,
    remote: string,
    options?: PutObjectOptions,
  ): Promise<PutObjectOutput> {
    const buffer = fs.readFileSync(path);

    return this.putObject(bucket, buffer, remote, options);
  }

  public async deleteObject(
    bucket: string,
    remote: string,
    options?: DeleteObjectOptions,
  ): Promise<DeleteObjectOutput> {
    const { disableAutoPrefix, prefixContext, options: preparedOptions } = prepareOptions(options);

    return this.client.send(
      new DeleteObjectCommand({
        Bucket: bucket,
        Key: disableAutoPrefix ? remote : this.prefixService.prefix(remote, bucket, prefixContext),
        ...preparedOptions,
      }),
    );
  }

  public async deleteObjects(
    bucket: string,
    remotes: string[],
    options?: DeleteObjectsOptions,
  ): Promise<DeleteObjectsOutput> {
    const { disableAutoPrefix, prefixContext, options: preparedOptions } = prepareOptions(options);

    return this.client.send(
      new DeleteObjectsCommand({
        Bucket: bucket,
        Delete: {
          Objects: remotes.map((r) => ({
            Key: disableAutoPrefix ? r : this.prefixService.prefix(r, bucket, prefixContext),
          })),
        },
        ...preparedOptions,
      }),
    );
  }

  public async getObject(bucket: string, remote: string, options?: GetObjectOptions): Promise<GetObjectOutput> {
    const { disableAutoPrefix, prefixContext, options: preparedOptions } = prepareOptions(options);

    return this.client.send(
      new GetObjectCommand({
        Bucket: bucket,
        Key: disableAutoPrefix ? remote : this.prefixService.prefix(remote, bucket, prefixContext),
        ...preparedOptions,
      }),
    );
  }

  public async copyObject(
    sourceBucket: string,
    sourceKey: string,
    destinationBucket: string,
    destinationKey: string,
    options?: {
      sourceOptions?: DisableAutoPrefix & PrefixContext;
      destinationOptions?: CopyObjectOptions;
    },
  ): Promise<CopyObjectOutput> {
    const sourceOpts = options?.sourceOptions ?? {};
    const destOpts = options?.destinationOptions ?? {};

    const { disableAutoPrefix: sourceDisableAutoPrefix, prefixContext: sourcePrefixContext } = sourceOpts;
    const {
      disableAutoPrefix: destDisableAutoPrefix,
      prefixContext: destPrefixContext,
      options: preparedOptions,
    } = prepareOptions(destOpts);

    const prefixedSourceKey = sourceDisableAutoPrefix
      ? sourceKey
      : this.prefixService.prefix(sourceKey, sourceBucket, sourcePrefixContext);
    const prefixedDestinationKey = destDisableAutoPrefix
      ? destinationKey
      : this.prefixService.prefix(destinationKey, destinationBucket, destPrefixContext);

    return this.client.send(
      new CopyObjectCommand({
        CopySource: encodeURIComponent(`${sourceBucket}/${prefixedSourceKey}`),
        Bucket: destinationBucket,
        Key: prefixedDestinationKey,
        ...preparedOptions,
      }),
    );
  }

  public async listObjects(bucket: string, options?: ListObjectsOptions): Promise<ListObjectsOutput> {
    return this.client.send(
      new ListObjectsCommand({
        Bucket: bucket,
        ...options,
      }),
    );
  }

  public async listObjectsV2(bucket: string, options?: ListObjectsV2Options): Promise<ListObjectsV2Output> {
    return this.client.send(
      new ListObjectsV2Command({
        Bucket: bucket,
        ...options,
      }),
    );
  }
}
