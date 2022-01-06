import {
  DeleteObjectCommand,
  DeleteObjectCommandInput,
  DeleteObjectOutput,
  DeleteObjectsCommand,
  DeleteObjectsCommandInput,
  DeleteObjectsOutput,
  GetObjectCommand,
  GetObjectCommandInput,
  GetObjectOutput,
  PutObjectCommand,
  PutObjectCommandInput,
  PutObjectOutput,
  S3Client,
} from '@aws-sdk/client-s3';
import { Inject, Injectable } from '@nestjs/common';
import * as fs from 'fs';
import { S3_SERVICE } from '../constants';
import { PrefixService } from './prefix.service';

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
    options: Omit<PutObjectCommandInput, 'Bucket' | 'Body' | 'Key'> = {},
  ): Promise<PutObjectOutput> {
    return this.client.send(
      new PutObjectCommand({
        Bucket: bucket,
        Body: body,
        Key: this.prefixService.prefix(remote),
        ...options,
      }),
    );
  }

  public async putObjectFromPath(
    bucket: string,
    path: string,
    remote: string,
    options: Omit<PutObjectCommandInput, 'Bucket' | 'Body' | 'Key'> = {},
  ): Promise<PutObjectOutput> {
    const buffer = fs.readFileSync(path);

    return this.putObject(bucket, buffer, remote, options);
  }

  public async deleteObject(
    bucket: string,
    remote: string,
    options: Omit<DeleteObjectCommandInput, 'Bucket' | 'Key'> = {},
  ): Promise<DeleteObjectOutput> {
    return this.client.send(
      new DeleteObjectCommand({
        Bucket: bucket,
        Key: this.prefixService.prefix(remote),
        ...options,
      }),
    );
  }

  public async deleteObjects(
    bucket: string,
    remotes: string[],
    options: Omit<DeleteObjectsCommandInput, 'Bucket' | 'Delete'> = {},
  ): Promise<DeleteObjectsOutput> {
    return this.client.send(
      new DeleteObjectsCommand({
        Bucket: bucket,
        Delete: {
          Objects: remotes.map((r) => ({ Key: this.prefixService.prefix(r) })),
        },
        ...options,
      }),
    );
  }

  public async getObject(
    bucket: string,
    remote: string,
    options: Omit<GetObjectCommandInput, 'Bucket' | 'Key'> = {},
  ): Promise<GetObjectOutput> {
    return this.client.send(
      new GetObjectCommand({
        Bucket: bucket,
        Key: this.prefixService.prefix(remote),
        ...options,
      }),
    );
  }
}
