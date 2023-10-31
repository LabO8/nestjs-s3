---
id: deletion-helper
title: Deletion helper
sidebar_label: Deletion helper
slug: /deletion-helper
---

## Introduction

We want to be able to delete files from a directory. This is a common task, but it can be tedious to do it manually.

In order to do that we can use the deletion helper.

```typescript
import { Injectable } from '@nestjs/common';
import { DeletionService } from '@lab08/nestjs-s3';

@Injectable()
export class MyService {
  public constructor(private readonly deletionService: DeletionService) {}
}
```

What the deletion service does is help us delete files from a folder without a lot of code.

In order to delete the folder and all the objects inside, we can simply

```typescript
const result = this.deletionService.deleteObjectsByPrefix(bucket, prefix, logDeletedObjects, deleteOptions, listOptions);
```

we can pass the bucket, prefix(folder name), logDeletedObjects, deleteOptions and listOptions.

The `logDeletedObjects` is a boolean value which is used to specify if we want the deleted objects response.

If it is true the return value of the function is `Promise<DeleteObjectsOutput[]>`.
Otherwise, the return value is `Promise<boolean>`.

The `deleteOptions` is an object which is used to specify the options for the delete request.
The type is `DeleteObjectsOptions`. We can also pass options for the request made to S3

```typescript
interface DeleteObjectsRequest {
    /**
     * <p>The concatenation of the authentication device's serial number, a space, and the value
     *          that is displayed on your authentication device. Required to permanently delete a versioned
     *          object if versioning is configured with MFA delete enabled.</p>
     */
    MFA?: string;
    /**
     * <p>Confirms that the requester knows that they will be charged for the request. Bucket
     *          owners need not specify this parameter in their requests. For information about downloading
     *          objects from Requester Pays buckets, see <a href="https://docs.aws.amazon.com/AmazonS3/latest/dev/ObjectsinRequesterPaysBuckets.html">Downloading Objects in
     *             Requester Pays Buckets</a> in the <i>Amazon S3 User Guide</i>.</p>
     */
    RequestPayer?: RequestPayer | string;
    /**
     * <p>Specifies whether you want to delete this object even if it has a Governance-type Object
     *          Lock in place. To use this header, you must have the
     *             <code>s3:BypassGovernanceRetention</code> permission.</p>
     */
    BypassGovernanceRetention?: boolean;
    /**
     * <p>The account ID of the expected bucket owner. If the bucket is owned by a different account, the request fails with the HTTP status code <code>403 Forbidden</code> (access denied).</p>
     */
    ExpectedBucketOwner?: string;
    /**
     * <p>Indicates the algorithm used to create the checksum for the object when using the SDK. This header will not provide any
     *     additional functionality if not using the SDK. When sending this header, there must be a corresponding <code>x-amz-checksum</code> or
     *     <code>x-amz-trailer</code> header sent. Otherwise, Amazon S3 fails the request with the HTTP status code <code>400 Bad Request</code>. For more
     *     information, see <a href="https://docs.aws.amazon.com/AmazonS3/latest/userguide/checking-object-integrity.html">Checking object integrity</a> in
     *     the <i>Amazon S3 User Guide</i>.</p>
     *          <p>If you provide an individual checksum, Amazon S3 ignores any provided
     *             <code>ChecksumAlgorithm</code> parameter.</p>
     *          <p>This checksum algorithm must be the same for all parts and it match the checksum value
     *          supplied in the <code>CreateMultipartUpload</code> request.</p>
     */
    ChecksumAlgorithm?: ChecksumAlgorithm | string;
}
```

The `listOptions` is an object which is used to specify the options for the list request, which is needed in order to get the objects which should be deleted. 
Its type is `Omit<ListObjectsV2Options, 'Prefix' | 'ContinuationToken'>`. 
We omit the `Prefix` and `ContinuationToken` because they are already specified in the function call.
We can also pass options for the request made to S3

```typescript
interface ListObjectsV2Request {
    /**
     * <p>A delimiter is a character that you use to group keys.</p>
     */
    Delimiter?: string;
    /**
     * <p>Encoding type used by Amazon S3 to encode object keys in the response.</p>
     */
    EncodingType?: EncodingType | string;
    /**
     * <p>Sets the maximum number of keys returned in the response. By default, the action returns
     *          up to 1,000 key names. The response might contain fewer keys but will never contain
     *          more.</p>
     */
    MaxKeys?: number;
    /**
     * <p>The owner field is not present in <code>ListObjectsV2</code> by default. If you want to
     *          return the owner field with each key in the result, then set the <code>FetchOwner</code>
     *          field to <code>true</code>.</p>
     */
    FetchOwner?: boolean;
    /**
     * <p>StartAfter is where you want Amazon S3 to start listing from. Amazon S3 starts listing after this
     *          specified key. StartAfter can be any key in the bucket.</p>
     */
    StartAfter?: string;
    /**
     * <p>Confirms that the requester knows that she or he will be charged for the list objects
     *          request in V2 style. Bucket owners need not specify this parameter in their
     *          requests.</p>
     */
    RequestPayer?: RequestPayer | string;
    /**
     * <p>The account ID of the expected bucket owner. If the bucket is owned by a different account, the request fails with the HTTP status code <code>403 Forbidden</code> (access denied).</p>
     */
    ExpectedBucketOwner?: string;
    /**
     * <p>Specifies the optional fields that you want returned in the response.
     *          Fields that you do not specify are not returned.</p>
     */
    OptionalObjectAttributes?: (OptionalObjectAttributes | string)[];
}
```

## Examples

### Delete all objects from a folder with default options

```typescript
const result = await deletionHelperService.deleteObjectsByPrefix(bucketName, 'delete-prefix');
```

### Delete all objects from a folder with custom options for the files count which are deleted in one request

The default value is 1000, but we can change it to something else if we want to load and delete the files in smaller batches.

```typescript
const result = await deletionHelperService.deleteObjectsByPrefix(
  bucketName,
  'delete-prefix1',
  false,
  {},
  { MaxKeys: 10 },
);
```