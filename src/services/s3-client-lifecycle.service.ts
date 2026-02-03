import { S3Client } from '@aws-sdk/client-s3';
import { Inject, Injectable, OnModuleDestroy } from '@nestjs/common';
import { S3_SERVICE } from '../constants';

/**
 * Manages S3Client lifecycle by properly destroying it when the module is torn down.
 * Prevents hanging HTTP connections that would keep tests from exiting cleanly.
 */
@Injectable()
export class S3ClientLifecycleService implements OnModuleDestroy {
  constructor(@Inject(S3_SERVICE) private readonly s3Client: S3Client) {}

  onModuleDestroy() {
    this.s3Client.destroy();
  }
}
