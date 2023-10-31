import { HttpService } from '@nestjs/axios';
import { Injectable } from '@nestjs/common';
import * as fs from 'fs';
import * as path from 'path';
import { DEFAULT_EXPIRES_IN } from '../constants';
import { MissingDownloadDirectoryException } from '../exceptions';
import { PrefixService, SignedUrlService } from '../services';
import { DownloadOptions, GetObjectOptions } from '../types';

@Injectable()
export class DownloadService {
  public constructor(
    private readonly httpClient: HttpService,
    private readonly prefixService: PrefixService,
    private readonly signedUrlService: SignedUrlService,
  ) {}

  public async download(
    bucket: string,
    remote: string,
    downloadDirectory: string,
    downloadOptions?: DownloadOptions,
    options?: GetObjectOptions,
  ): Promise<string> {
    const defaults: DownloadOptions = {
      mode: 0o755,
      createPath: true,
      filename: null,
      ...downloadOptions,
    };

    if (!fs.existsSync(downloadDirectory) && !defaults.createPath) {
      throw new MissingDownloadDirectoryException(downloadDirectory);
    }

    if (!fs.existsSync(downloadDirectory)) {
      fs.mkdirSync(downloadDirectory, {
        recursive: true,
        mode: defaults.mode,
      });
    }

    const filename = defaults.filename ?? path.basename(remote);
    const signedUrl = await this.signedUrlService.getSignedUrl(bucket, remote, DEFAULT_EXPIRES_IN, options);

    const localFilePath = path.resolve(downloadDirectory, filename);

    const writer = fs.createWriteStream(localFilePath);

    const response = await this.httpClient.axiosRef({
      url: signedUrl,
      method: 'GET',
      responseType: 'stream',
    });

    response.data.pipe(writer);

    return new Promise((resolve, reject) => {
      writer.on('finish', () => {
        resolve(localFilePath);
      });
      writer.on('error', reject);
    }) as Promise<string>;
  }
}
