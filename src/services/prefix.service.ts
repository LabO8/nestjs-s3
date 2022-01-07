import { Inject, Injectable } from '@nestjs/common';
import { S3_CONFIG } from '../constants';
import { S3Config } from '../types';

@Injectable()
export class PrefixService {
  public constructor(@Inject(S3_CONFIG) private readonly config: S3Config) {}

  public prefix(remote: string): string {
    const { prefix } = this.config;

    if (!prefix) {
      return remote;
    }

    return `${prefix}${remote}`;
  }
}
