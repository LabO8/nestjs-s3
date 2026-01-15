import { Command, CommandRunner } from 'nest-commander';
import { BucketsService, DeletionService, ObjectsService } from '../../../src';
import ora from 'ora';

@Command({
  name: 'bucket:delete:all',
  description: 'Deletes all buckets and objects',
})
export class DeleteAllBucketsCommand extends CommandRunner {
  public constructor(
    private readonly bucketService: BucketsService,
    private readonly objectService: ObjectsService,
    private readonly deletionService: DeletionService,
  ) {
    super();
  }

  async run(): Promise<void> {
    const spinner = ora().start('Fetching buckets...');

    const buckets = await this.bucketService.list();
    spinner.succeed(
      `Buckets fetched. Found ${buckets.Buckets.length} buckets.`,
    );

    spinner.start('Deleting all buckets...');

    for (const b of buckets.Buckets) {
      spinner.text = `Deleting bucket ${b.Name}`;
      await this.deletionService.deleteObjectsByPrefix(b.Name, '', false, {
        disableAutoPrefix: true,
      });

      await this.bucketService.delete(b.Name);
    }

    spinner.succeed('All buckets and objects deleted.');
  }
}
