import { Inject, Injectable } from '@nestjs/common';
import { PREFIX_ALGORITHM, S3_CONFIG } from '../constants';
import { S3Config } from '../types';
import { IPrefixAlgorithm } from '../interfaces';

@Injectable()
export class PrefixService {
  public constructor(
    @Inject(S3_CONFIG) private readonly config: S3Config,
    @Inject(PREFIX_ALGORITHM) private readonly prefixAlgorithm: IPrefixAlgorithm,
  ) {}

  public prefix(remote: string, bucket?: string): string {
    const { prefix } = this.config;

    return this.prefixAlgorithm.prefix(remote, prefix, bucket);
  }
}
