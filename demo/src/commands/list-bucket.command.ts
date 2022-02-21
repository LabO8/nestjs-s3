import { Command, CommandRunner } from 'nest-commander';
import * as ora from 'ora';
import { BucketsService } from '../../../src';

@Command({ name: 'bucket:list', description: 'List a bucket in aws' })
export class ListBucketCommand implements CommandRunner {
  public constructor(private readonly bucketService: BucketsService) {}

  async run(): Promise<void> {
    const spinner = ora().start('Listing buckets');
    const buckets = await this.bucketService.list();

    spinner.succeed('Buckets loaded.');

    if (buckets.Buckets.length === 0) {
      console.log('No buckets found.');

      return;
    }

    console.log('\n');
    console.log(`Owner: ${buckets.Owner.DisplayName}`);
    console.table(
      buckets.Buckets.map((b) => ({
        bucket: b.Name,
        createdOn: b.CreationDate,
      })),
    );
  }
}
