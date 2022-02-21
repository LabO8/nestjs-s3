import {
  AccelerateConfiguration,
  Bucket,
  CORSConfiguration,
  CreateBucketCommand,
  CreateBucketCommandInput,
  CreateBucketCommandOutput,
  DeleteBucketCommand,
  DeleteBucketCommandOutput,
  GetBucketTaggingCommand,
  GetBucketTaggingCommandOutput,
  ListBucketsCommand,
  ListBucketsCommandOutput,
  PutBucketAccelerateConfigurationCommand,
  PutBucketAccelerateConfigurationCommandOutput,
  PutBucketAclCommand,
  PutBucketAclCommandInput,
  PutBucketAclCommandOutput,
  PutBucketCorsCommand,
  PutBucketCorsCommandOutput,
  PutBucketEncryptionCommand,
  PutBucketEncryptionCommandInput,
  PutBucketEncryptionCommandOutput,
  PutBucketLoggingCommand,
  PutBucketLoggingCommandInput,
  PutBucketLoggingCommandOutput,
  S3Client,
} from '@aws-sdk/client-s3';
import { Inject, Injectable } from '@nestjs/common';
import { S3_SERVICE } from '../constants';

@Injectable()
export class BucketsService {
  public constructor(@Inject(S3_SERVICE) private readonly client: S3Client) {}

  public async create(
    bucket: string,
    options: Omit<CreateBucketCommandInput, 'Bucket'> = {},
  ): Promise<CreateBucketCommandOutput> {
    return await this.client.send(
      new CreateBucketCommand({
        Bucket: bucket,
        ...options,
      }),
    );
  }

  public async delete(bucket: string): Promise<DeleteBucketCommandOutput> {
    return await this.client.send(
      new DeleteBucketCommand({
        Bucket: bucket,
      }),
    );
  }

  public async list(): Promise<ListBucketsCommandOutput> {
    return await this.client.send(new ListBucketsCommand({}));
  }

  public async find(bucket: string): Promise<Bucket | undefined> {
    const buckets = await this.client.send(new ListBucketsCommand({}));

    return buckets.Buckets.find((b) => b.Name === bucket);
  }

  public async tagging(bucket: string): Promise<GetBucketTaggingCommandOutput> {
    return await this.client.send(
      new GetBucketTaggingCommand({
        Bucket: bucket,
      }),
    );
  }

  public async updateCors(bucket: string, configuration: CORSConfiguration): Promise<PutBucketCorsCommandOutput> {
    return await this.client.send(
      new PutBucketCorsCommand({
        Bucket: bucket,
        CORSConfiguration: configuration,
      }),
    );
  }

  public async updateAcl(
    bucket: string,
    configuration: Omit<PutBucketAclCommandInput, 'Bucket'>,
  ): Promise<PutBucketAclCommandOutput> {
    return await this.client.send(
      new PutBucketAclCommand({
        Bucket: bucket,
        ...configuration,
      }),
    );
  }

  public async updateLogging(
    bucket: string,
    configuration: Omit<PutBucketLoggingCommandInput, 'Bucket'>,
  ): Promise<PutBucketLoggingCommandOutput> {
    return await this.client.send(
      new PutBucketLoggingCommand({
        Bucket: bucket,
        ...configuration,
      }),
    );
  }

  public async updateEncryption(
    bucket: string,
    configuration: Omit<PutBucketEncryptionCommandInput, 'Bucket'>,
  ): Promise<PutBucketEncryptionCommandOutput> {
    return await this.client.send(
      new PutBucketEncryptionCommand({
        Bucket: bucket,
        ...configuration,
      }),
    );
  }

  public async updateAccelerateConfiguration(
    bucket: string,
    configuration: AccelerateConfiguration,
  ): Promise<PutBucketAccelerateConfigurationCommandOutput> {
    return await this.client.send(
      new PutBucketAccelerateConfigurationCommand({
        Bucket: bucket,
        AccelerateConfiguration: configuration,
      }),
    );
  }
}
