import {
  DeleteObjectCommand,
  DeleteObjectOutput,
  DeleteObjectsCommand,
  DeleteObjectsOutput,
  GetObjectCommand,
  GetObjectOutput,
  ListObjectsCommand,
  ListObjectsOutput,
  PutObjectCommand,
  PutObjectOutput,
  S3Client,
} from '@aws-sdk/client-s3';
import { Inject, Injectable } from '@nestjs/common';
import * as fs from 'fs';
import { S3_SERVICE } from '../constants';
import {
  DeleteObjectOptions,
  DeleteObjectsOptions,
  GetObjectOptions,
  ListObjectOptions,
  OptionsWithAutoPrefix,
  PutObjectOptions,
} from '../types';
import { PrefixService } from './prefix.service';

@Injectable()
export class ObjectsService {
  public constructor(
    @Inject(S3_SERVICE) private readonly client: S3Client,
    private readonly prefixService: PrefixService,
  ) {}

  private prepareOptions(options: OptionsWithAutoPrefix): {
    options: Omit<OptionsWithAutoPrefix, 'disableAutoPrefix'>;
    disableAutoPrefix: boolean;
  } {
    const disableAutoPrefix = options?.disableAutoPrefix ?? false;

    delete options?.disableAutoPrefix;

    return { options, disableAutoPrefix };
  }

  public async putObject(
    bucket: string,
    body: Buffer,
    remote: string,
    options?: PutObjectOptions,
  ): Promise<PutObjectOutput> {
    const { disableAutoPrefix, options: preparedOptions } = this.prepareOptions(options);

    return this.client.send(
      new PutObjectCommand({
        Bucket: bucket,
        Body: body,
        Key: disableAutoPrefix ? remote : this.prefixService.prefix(remote),
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
    const { disableAutoPrefix, options: preparedOptions } = this.prepareOptions(options);

    return this.client.send(
      new DeleteObjectCommand({
        Bucket: bucket,
        Key: disableAutoPrefix ? remote : this.prefixService.prefix(remote),
        ...options,
      }),
    );
  }

  public async deleteObjects(
    bucket: string,
    remotes: string[],
    options?: DeleteObjectsOptions,
  ): Promise<DeleteObjectsOutput> {
    const { disableAutoPrefix, options: preparedOptions } = this.prepareOptions(options);

    return this.client.send(
      new DeleteObjectsCommand({
        Bucket: bucket,
        Delete: {
          Objects: remotes.map((r) => ({ Key: disableAutoPrefix ? r : this.prefixService.prefix(r) })),
        },
        ...options,
      }),
    );
  }

  public async getObject(bucket: string, remote: string, options?: GetObjectOptions): Promise<GetObjectOutput> {
    const { disableAutoPrefix, options: preparedOptions } = this.prepareOptions(options);

    return this.client.send(
      new GetObjectCommand({
        Bucket: bucket,
        Key: disableAutoPrefix ? remote : this.prefixService.prefix(remote),
        ...options,
      }),
    );
  }

  public async listObjects(bucket: string, options?: ListObjectOptions): Promise<ListObjectsOutput> {
    return this.client.send(
      new ListObjectsCommand({
        Bucket: bucket,
        ...options,
      }),
    );
  }
}
