import { DeleteObjectOutput, DeleteObjectsCommand, ListObjectsV2Output, S3Client } from '@aws-sdk/client-s3';
import { Inject, Injectable } from '@nestjs/common';
import { PREFIX_ALGORITHM, S3_SERVICE } from '../constants';
import { DeleteObjectsOptions, ListObjectsV2Options } from '../types';
import { ObjectsService, PrefixService } from '../services';
import { prepareOptions } from '../helpers';

@Injectable()
export class DeletionService {
  public constructor(
    @Inject(S3_SERVICE) private readonly client: S3Client,
    private readonly objectsService: ObjectsService,
    private readonly prefixService: PrefixService,
  ) {}

  /**
   * Deletes all objects by prefix.
   * @returns {Promise<boolean>} Returns true if all objects were deleted.
   */
  public async deleteObjectsByPrefix(
    bucket: string,
    prefix: string,
    logDeletedObjects = false,
    deleteOptions?: DeleteObjectsOptions,
    listOptions?: Omit<ListObjectsV2Options, 'Prefix' | 'ContinuationToken'>,
  ): Promise<boolean | DeleteObjectOutput[]> {
    const { disableAutoPrefix, options: preparedOptions } = prepareOptions(deleteOptions);

    let continuationToken = null;
    const result: DeleteObjectOutput[] = [];
    let data: ListObjectsV2Output;

    do {
      data = await this.objectsService.listObjectsV2(bucket, {
        Prefix: disableAutoPrefix ? prefix : this.prefixService.prefix(prefix, bucket, deleteOptions?.prefixContext),
        ContinuationToken: continuationToken,
        ...listOptions,
      });

      if (!data.Contents) {
        return false;
      }

      const response = await this.client.send(
        new DeleteObjectsCommand({
          Bucket: bucket,
          Delete: {
            Objects: data.Contents.map((object) => ({ Key: object.Key })),
          },
          ...preparedOptions,
        }),
      );

      if (logDeletedObjects) {
        result.push(response);
      }

      continuationToken = data.NextContinuationToken;
    } while (data.NextContinuationToken);

    // If we store all deleted objects response, the memory footprint may be too high.
    return logDeletedObjects ? result : true;
  }
}
