import { GetObjectCommandInput } from '@aws-sdk/client-s3';
import { HttpService } from '@nestjs/axios';
import { Injectable } from '@nestjs/common';
import { PrefixService, PreSignedUrlService } from '../services';

@Injectable()
export class DownloadService {
  public constructor(
    private readonly httpClient: HttpService,
    private readonly prefixService: PrefixService,
    private readonly preSignedUrlService: PreSignedUrlService,
  ) {}

  public async download(
    bucket: string,
    remote: string,
    options: Omit<GetObjectCommandInput, 'Bucket' | 'Key'> = {},
  ): Promise<void> {}
}
