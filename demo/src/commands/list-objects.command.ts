import { Command, CommandRunner } from 'nest-commander';
import * as ora from 'ora';
import { BucketsService, ObjectsService } from '../../../src';

@Command({ name: 'objects:list', description: 'List a bucket in aws' })
export class ListObjectsCommand extends CommandRunner {
  public constructor(
    private readonly objectService: ObjectsService,
    private readonly bucketService: BucketsService,
  ) {
    super();
  }

  async run(passedParams: string[]): Promise<void> {
    const [bucket] = passedParams;

    const bucketExists = await this.bucketService.find(bucket);

    if (!bucketExists) {
      throw new Error(`Bucket ${bucket} is not found.`);
    }

    const spinner = ora().start('Loading objects ...');

    const items = await this.objectService.listObjects(bucket);

    spinner.succeed('Objects loaded.');

    console.table(
      items.Contents.map((i) => ({
        key: i.Key,
        etag: i.ETag,
        lastModifined: i.LastModified,
        size: i.Size,
      })),
    );
  }
}
