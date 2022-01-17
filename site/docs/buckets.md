---
id: buckets
title: Buckets service
sidebar_label: Buckets
slug: /docs/buckets-service
---

## Introduction

The S3 Bucket service is used when we want to make changes to buckets.

We can do multiple things with this service like:

- create buckets
- list buckets
- delete buckets
- tag buckets and etc.

## Basic usage

The pre-requisites to use this service is just to have the main module initialized in our app, so we have access to all the services that it exports.
Later when we need a service we can simply:

```typescript
import { Injectable } from '@nestjs/common';
import { BucketsService } from '@lab08/nestjs-s3';

@Injectable()
export class MyService {
  public constructor(private readonly bucketService: BucketService) {}
}
```

then we can simply call start using the service freely.

### Listing buckets

One of the things we can do is list buckets. In other to do that we can use the `list` method of the service

```typescript
const buckets = await this.bucketService.list();
```

which will return a `Promise` containing

```typescript
interface ListBucketsCommandOutput {
  /**
   * The list of buckets owned by the requestor.
   */
  Buckets?: Bucket[];
  /**
   * The owner of the buckets listed.
   */
  Owner?: Owner;
  /**
   * Metadata pertaining to this request.
   */
  $metadata: ResponseMetadata;
}
```

### Creating buckets

When we need to create a new bucket we can just simply

```typescript
const bucket = await this.bucketService.create('test-bucket');
```

or

```typescript
const bucket = await this.bucketService.create('test-bucket', options);
```

where options can be

```typescript
export interface CreateBucketRequest {
  /**
   * The canned ACL to apply to the bucket.
   */
  ACL?: BucketCannedACL | string;
  /**
   * The configuration information for the bucket.
   */
  CreateBucketConfiguration?: CreateBucketConfiguration;
  /**
   * Allows grantee the read, write, read ACP, and write ACP permissions on the bucket.
   */
  GrantFullControl?: string;
  /**
   * Allows grantee to list the objects in the bucket.
   */
  GrantRead?: string;
  /**
   * Allows grantee to read the bucket ACL.
   */
  GrantReadACP?: string;
  /**
   * Allows grantee to create new objects in the bucket.
   * For the bucket and object owners of existing objects, also allows deletions and overwrites of those objects.
   */
  GrantWrite?: string;
  /**
   * Allows grantee to write the ACL for the applicable bucket.
   */
  GrantWriteACP?: string;
  /**
   * Specifies whether you want S3 Object Lock to be enabled for the new bucket.
   */
  ObjectLockEnabledForBucket?: boolean;
}
```

which will return a `Promise` containing

```typescript
interface CreateBucketCommandOutput {
  /**
   * Specifies the Region where the bucket will be created. If you are creating a bucket on
   *          the US East (N. Virginia) Region (us-east-1), you do not need to specify the
   *          location.
   */
  Location?: string;
  /**
   * Metadata pertaining to this request.
   */
  $metadata: ResponseMetadata;
}
```
