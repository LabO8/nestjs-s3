import { Command, CommandRunner } from "nest-commander";
import { BucketsService } from "../../../src";
import * as ora from 'ora';

@Command({ name: 'bucket:create', description: 'Create a bucket in aws' })
export class CreateBucketCommand implements CommandRunner { 

    public constructor(private readonly bucketService: BucketsService) {}

    async run(passedParams: string[], options?: Record<string, any>): Promise<void> {
        const [bucket] = passedParams;

        if(!bucket) {
            throw new Error('Bucket name is empty.');
        }

        const spinner = ora().start(`Creating bucket: ${bucket}`);

        const result = await this.bucketService.create(bucket);

        spinner.succeed(`Bucket ${bucket} created. Location: ${result.Location}`);
    }

}