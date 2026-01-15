import { CommandRunner, Command } from 'nest-commander';
import ora from 'ora';
import { BucketsService } from '../../../src';

@Command({ name: 'bucket:create', description: 'Create a bucket in aws' })
export class CreateBucketCommand extends CommandRunner {
  public constructor(private readonly bucketService: BucketsService) {
    super();
  }

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
