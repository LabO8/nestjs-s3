import { Command, CommandRunner } from "nest-commander";
import { ObjectsService } from "../../../src";

@Command({ name: 'objects:list', description: 'List a bucket in aws' })
export class ListObjectsCommand  implements CommandRunner {
    public constructor(private readonly objectService: ObjectsService) { }

    async run(passedParams: string[], options?: Record<string, any>): Promise<void> {
        
    }
}