import {
  DeleteObjectCommand,
  DeleteObjectOutput,
  DeleteObjectsCommand,
  DeleteObjectsOutput,
  PutObjectCommand,
  PutObjectOutput,
  S3Client,
} from '@aws-sdk/client-s3';
import { Inject, Injectable } from '@nestjs/common';
import * as fs from 'fs';
import { S3_CONFIG, S3_SERVICE } from '../constants';
import { S3Config } from '../types';

@Injectable()
export class ObjectsService {
  public constructor(
    @Inject(S3_SERVICE) private readonly client: S3Client,
    @Inject(S3_CONFIG) private readonly config: S3Config,
  ) {}

  public prefixFile(remote: string): string {
    const { prefix } = this.config;

    if (!prefix) {
      return remote;
    }

    return `${prefix}${remote}`;
  }

  public async putObject(bucket: string, body: Buffer, remote: string): Promise<PutObjectOutput> {
    return this.client.send(
      new PutObjectCommand({
        Bucket: bucket,
        Body: body,
        Key: this.prefixFile(remote),
      }),
    );
  }

  public async putObjectFromPath(bucket: string, path: string, remote: string): Promise<PutObjectOutput> {
    const buffer = fs.readFileSync(path);

    return this.putObject(bucket, buffer, remote);
  }

  public async deleteObject(bucket: string, remote: string): Promise<DeleteObjectOutput> {
    return this.client.send(
      new DeleteObjectCommand({
        Bucket: bucket,
        Key: this.prefixFile(remote),
      }),
    );
  }

  public async deleteObjects(bucket: string, remotes: string[]): Promise<DeleteObjectsOutput> {
    return this.client.send(
      new DeleteObjectsCommand({
        Bucket: bucket,
        Delete: {
          Objects: remotes.map((r) => ({ Key: this.prefixFile(r) })),
        },
      }),
    );
  }
}
