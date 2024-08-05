import * as fs from 'fs';
import { Command, CommandRunner, Option } from 'nest-commander';
import * as ora from 'ora';
import * as path from 'path';
import { BucketsService, ObjectsService } from '../../../src';

@Command({ name: 'objects:create', description: 'Create an aws s3 object' })
export class UploadFileCommand extends CommandRunner {
  public constructor(
    private readonly objectService: ObjectsService,
    private readonly bucketService: BucketsService,
  ) {
    super();
  }

  public async run(
    passedParams: string[],
    options?: Record<string, any>,
  ): Promise<void> {
    const [bucket, localPath] = passedParams;

    if (!localPath) {
      throw new Error('Local path is not defined.');
    }

    if (!bucket) {
      throw new Error('Bucket is not defined.');
    }

    if (!fs.existsSync(localPath)) {
      throw new Error('Local file does not exist.');
    }

    if (!(await this.bucketService.find(bucket))) {
      throw new Error(`Bucket ${bucket} does not exist.`);
    }

    const key = options?.key ?? path.basename(localPath);

    const spinner = ora().start(`Uploading ${localPath}`);

    const result = await this.objectService.putObjectFromPath(
      bucket,
      localPath,
      key,
    );

    spinner.succeed('Uploaed completed.');
    console.log(`Object uploaded to remote ${key}. Etag: ${result.ETag}`);
  }

  @Option({
    flags: '-k, --key [string]',
    description: 'The remote key',
  })
  parseNumber(val: string): string {
    return val;
  }
}
