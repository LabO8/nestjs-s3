import {
  DeleteObjectCommand,
  DeleteObjectsCommand,
  GetObjectCommand,
  PutObjectCommand,
  S3Client,
} from '@aws-sdk/client-s3';
import { getSignedUrl } from '@aws-sdk/s3-request-presigner';
import { Inject, Injectable } from '@nestjs/common';
import { DEFAULT_EXPIRES_IN, S3_SERVICE } from '../constants';
import { PutSignedUrl } from '../types';
import { PrefixService } from './prefix.service';

@Injectable()
export class PreSignedUrlService {
  public constructor(
    @Inject(S3_SERVICE) private readonly client: S3Client,
    private readonly prefixService: PrefixService,
  ) {}

  async getPutSignedUrl(bucket: string, remote: string, expiresIn: number = DEFAULT_EXPIRES_IN): Promise<PutSignedUrl> {
    const prefixedRemote = this.prefixService.prefix(remote);

    const command = new PutObjectCommand({
      Bucket: bucket,
      Key: prefixedRemote,
    });

    const preSignedUrl = await getSignedUrl(this.client, command, {
      expiresIn,
    });

    return {
      url: preSignedUrl,
      remote: prefixedRemote,
    };
  }

  async getSignedUrl(bucket: string, remote: string, expiresIn: number = DEFAULT_EXPIRES_IN): Promise<string> {
    const prefixedRemote = this.prefixService.prefix(remote);

    const command = new GetObjectCommand({
      Bucket: bucket,
      Key: prefixedRemote,
    });

    const preSignedUrl = await getSignedUrl(this.client, command, {
      expiresIn,
    });

    return preSignedUrl;
  }

  async getDeleteSignedUrl(bucket: string, remote: string, expiresIn: number = DEFAULT_EXPIRES_IN): Promise<string> {
    const prefixedRemote = this.prefixService.prefix(remote);

    const command = new DeleteObjectCommand({
      Bucket: bucket,
      Key: prefixedRemote,
    });

    const preSignedUrl = await getSignedUrl(this.client, command, {
      expiresIn,
    });

    return preSignedUrl;
  }

  async getDeleteObjectsSignedUrl(
    bucket: string,
    remotes: string[],
    expiresIn: number = DEFAULT_EXPIRES_IN,
  ): Promise<string> {
    const prefixedRemotes = remotes.map((r) => ({
      Key: this.prefixService.prefix(r),
    }));

    const command = new DeleteObjectsCommand({
      Bucket: bucket,
      Delete: {
        Objects: prefixedRemotes,
      },
    });

    const preSignedUrl = await getSignedUrl(this.client, command, {
      expiresIn,
    });

    return preSignedUrl;
  }
}
