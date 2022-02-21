import { Command, CommandRunner } from 'nest-commander';
import * as ora from 'ora';
import { BucketsService } from '../../../src';

@Command({ name: 'bucket:create', description: 'Create a bucket in aws' })
export class CreateBucketCommand implements CommandRunner {
  public constructor(private readonly bucketService: BucketsService) {}

  async run(passedParams: string[]): Promise<void> {
    const [bucket] = passedParams;

    if (!bucket) {
      throw new Error('Bucket name is empty.');
    }

    const spinner = ora().start(`Creating bucket: ${bucket}`);

    const result = await this.bucketService.create(bucket);

    spinner.succeed(`Bucket ${bucket} created. Location: ${result.Location}`);
  }
}
