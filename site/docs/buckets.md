---
id: buckets
title: Buckets service
sidebar_label: Buckets
slug: /buckets-service
---

## Introduction

The S3 Bucket service is used when we want to make changes to buckets.

We can do multiple things with this service like:

- create buckets
- list buckets
- delete buckets
- tag buckets, etc..

## Basic usage

The pre-requisites to use this service are to have the main module initialized in our app, so we can access all the services it exports.
Later, when we need a service we can simply:

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

When we need to create a new bucket we can just simply call

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
   * For the bucket and object owners of existing objects, it also allows deletions and overwrites.
   */
  GrantWrite?: string;
  /**
   * Allows grantee to write the ACL for the applicable bucket.
   */
  GrantWriteACP?: string;
  /**
   * Specifies whether you want S3 Object Lock for the new bucket.
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

### Deleting buckets

After we already have a bucket, we can easily remove it. This can be done by calling the `delete` method.

```typescript
const result = await this.bucketService.delete('test-bucket');
```

which will return a `Promise` with the delete operation output

```typescript
interface DeleteBucketCommandOutput {
  /**
   * Metadata pertaining to this request.
   */
  $metadata: ResponseMetadata;
}
```

### Listing buckets

We can call the `list` method if we want to get all our existing buckets.

```typescript
const result = await this.bucketService.list();
```

which will return a list of all the buckets, that we have access to. It returns a `Promise` with the following:

```typescript
export interface ListBucketsCommandOutput {
  /**
   * <p>The list of buckets owned by the requestor.</p>
   */
  Buckets?: Bucket[];
  /**
   * <p>The owner of the buckets listed.</p>
   */
  Owner?: Owner;

  /**
   * Metadata pertaining to this request.
   */
  $metadata: ResponseMetadata;
}
```

### Searching for a bucket by name

If we want to see if we have a bucket with a specific name, we can use the `find` method and pass the name of the bucket we want.

```typescript
const result = await this.bucketService.find('test');
```

If found this method will return a `Promise` with a `Bucket` object, or if it cannot find a bucket - `undefined`.

### Upading a bucket

#### Tagging

We can do other things with a bucket like updating tags

```typescript
const result = await this.bucketService.tagging('test');
```

which will return a `Promise` with the following:

```typescript
export interface GetBucketTaggingCommandOutput {
  /**
   * <p>Contains the tag set.</p>
   */
  TagSet: Tag[] | undefined;

  /**
   * Metadata pertaining to this request.
   */
  $metadata: ResponseMetadata;
}
```

#### Updating CORS

We can update the exsisting cors

```typescript
const result = await this.bucketService.updateCors('test', options);
```

which can receive the following options

```typescript
export interface CORSConfiguration {
  /**
   * <p>A set of origins and methods (cross-origin access you want to allow). You can add
   *          up to 100 rules to the configuration.</p>
   */
  CORSRules: CORSRule[] | undefined;
}
```

which will return a `Promise` with

```typescript
export interface PutBucketCorsCommandOutput {
  /**
   * Metadata pertaining to this request.
   */
  $metadata: ResponseMetadata;
}
```

#### Updating ACL

```typescript
const result = await this.bucketService.updateAcl('test', options);
```

which can receive the following options

```typescript
export interface CORSConfiguration {
  /**
   * <p>The canned ACL to apply to the bucket.</p>
   */
  ACL?: BucketCannedACL | string;
  /**
   * <p>Contains the elements that set the ACL permissions for an object per grantee.</p>
   */
  AccessControlPolicy?: AccessControlPolicy;
  /**
   * <p>The base64-encoded 128-bit MD5 digest of the data. This header must be used as a message
   *          integrity check to verify that the request body was not corrupted in transit. For more
   *          information, go to <a href="http://www.ietf.org/rfc/rfc1864.txt">RFC
   *          1864.</a>
   *          </p>
   *          <p>For requests made using the Amazon Web Services Command Line Interface (CLI) or Amazon Web Services SDKs, this field is calculated automatically.</p>
   */
  ContentMD5?: string;
  /**
   * <p>Allows grantee the read, write, read ACP, and write ACP permissions on the
   *          bucket.</p>
   */
  GrantFullControl?: string;
  /**
   * <p>Allows grantee to list the objects in the bucket.</p>
   */
  GrantRead?: string;
  /**
   * <p>Allows grantee to read the bucket ACL.</p>
   */
  GrantReadACP?: string;
  /**
   * <p>Allows grantee to create new objects in the bucket.</p>
   *          <p>For the bucket and object owners of existing objects, also allows deletions and overwrites of those objects.</p>
   */
  GrantWrite?: string;
  /**
   * <p>Allows grantee to write the ACL for the applicable bucket.</p>
   */
  GrantWriteACP?: string;
  /**
   * <p>The account ID of the expected bucket owner. If different account owns the bucket, the request will fail with an HTTP <code>403 (Access Denied)</code> error.</p>
   */
  ExpectedBucketOwner?: string;
}
```

which will return a `Promise` with

```typescript
export interface PutBucketAclCommandOutput {
  /**
   * Metadata pertaining to this request.
   */
  $metadata: ResponseMetadata;
}
```

#### Updating Logging

```typescript
const result = await this.bucketService.updateLogging('test', options);
```

which can receive the following options

```typescript
export interface PutBucketLoggingCommandInput {
  /**
   * <p>Container for logging status information.</p>
   */
  BucketLoggingStatus: BucketLoggingStatus | undefined;
  /**
   * <p>The MD5 hash of the <code>PutBucketLogging</code> request body.</p>
   *          <p>For requests made using the Amazon Web Services Command Line Interface (CLI) or Amazon Web Services SDKs, this field is calculated automatically.</p>
   */
  ContentMD5?: string;
  /**
   * <p>The account ID of the expected bucket owner. If the bucket is owned by a different account, the request will fail with an HTTP <code>403 (Access Denied)</code> error.</p>
   */
  ExpectedBucketOwner?: string;
}
```

which will return a `Promise` with

```typescript
export interface PutBucketLoggingCommandOutput {
  /**
   * Metadata pertaining to this request.
   */
  $metadata: ResponseMetadata;
}
```

#### Updating encryption

```typescript
const result = await this.bucketService.updateEncryption('test', options);
```

which can receive the following options

```typescript
export interface PutBucketEncryptionCommandInput {
  /**
   * <p>The base64-encoded 128-bit MD5 digest of the server-side encryption configuration.</p>
   *          <p>For requests made using the Amazon Web Services Command Line Interface (CLI) or Amazon Web Services SDKs, this field is calculated automatically.</p>
   */
  ContentMD5?: string;
  /**
   * <p>Specifies the default server-side-encryption configuration.</p>
   */
  ServerSideEncryptionConfiguration: ServerSideEncryptionConfiguration | undefined;
  /**
   * <p>The account ID of the expected bucket owner. If the bucket is owned by a different account, the request will fail with an HTTP <code>403 (Access Denied)</code> error.</p>
   */
  ExpectedBucketOwner?: string;
}
```

which will return a `Promise` with

```typescript
export interface PutBucketEncryptionCommandOutput {
  /**
   * Metadata pertaining to this request.
   */
  $metadata: ResponseMetadata;
}
```

#### Updating accelerate configuration

```typescript
const result = await this.bucketService.updateAccelerateConfiguration('test', options);
```

which can receive the following options

```typescript
export interface AccelerateConfiguration {
  /**
   * <p>Specifies the transfer acceleration status of the bucket.</p>
   */
  Status?: BucketAccelerateStatus | string;
}
```

which will return a `Promise` with

```typescript
export interface PutBucketAccelerateConfigurationCommandOutput {
  /**
   * Metadata pertaining to this request.
   */
  $metadata: ResponseMetadata;
}
```
