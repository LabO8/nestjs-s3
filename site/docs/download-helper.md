---
id: download-helper
title: Download helper
sidebar_label: Download helper
slug: /download-helper
---

## Introduction

Sometimes, we have to do day-to-day tasks like downloading objects and storing them locally. This leads to a lot of boilerplate code, for managing the directories, writing to files, etc.

In order to do that we can use the download helper.

```typescript
import { Injectable } from '@nestjs/common';
import { DownloadService } from '@lab08/nestjs-s3';

@Injectable()
export class MyService {
  public constructor(private readonly downloadService: DownloadService) {}
}
```

What the download service does is help us do these day-to-day tasks easily and without a lot of code.

In order to download an object, we can simply

```typescript
const localPath = this.downloadService.download(bucket, remote, downloadDirectory, downloadOptions, options);
```

we can pass the following download options:

```typescript
export type DownloadOptions = {
  mode?: number | string;
  createPath?: boolean;
  filename?: string | null;
};
```

Defaults are

```typescript
const defaults: DownloadOptions = {
  mode: 0o755,
  createPath: true,
  filename: null,
};
```

and we can pass options for the request made to S3

```typescript
type GetObjectOptions {
/**
     * <p>Return the object only if its entity tag (ETag) is the same as the one specified,
     *          otherwise return a 412 (precondition failed).</p>
     */
    IfMatch?: string;
    /**
     * <p>Return the object only if it has been modified since the specified time, otherwise
     *          return a 304 (not modified).</p>
     */
    IfModifiedSince?: Date;
    /**
     * <p>Return the object only if its entity tag (ETag) is different from the one specified,
     *          otherwise return a 304 (not modified).</p>
     */
    IfNoneMatch?: string;
    /**
     * <p>Return the object only if it has not been modified since the specified time, otherwise
     *          return a 412 (precondition failed).</p>
     */
    IfUnmodifiedSince?: Date;
    /**
     * <p>Downloads the specified range bytes of an object. For more information about the HTTP
     *          Range header, see <a href="https://www.w3.org/Protocols/rfc2616/rfc2616-sec14.html#sec14.35">https://www.w3.org/Protocols/rfc2616/rfc2616-sec14.html#sec14.35</a>.</p>
     *          <note>
     *             <p>Amazon S3 doesn't support retrieving multiple ranges of data per <code>GET</code>
     *             request.</p>
     *          </note>
     */
    Range?: string;
    /**
     * <p>Sets the <code>Cache-Control</code> header of the response.</p>
     */
    ResponseCacheControl?: string;
    /**
     * <p>Sets the <code>Content-Disposition</code> header of the response</p>
     */
    ResponseContentDisposition?: string;
    /**
     * <p>Sets the <code>Content-Encoding</code> header of the response.</p>
     */
    ResponseContentEncoding?: string;
    /**
     * <p>Sets the <code>Content-Language</code> header of the response.</p>
     */
    ResponseContentLanguage?: string;
    /**
     * <p>Sets the <code>Content-Type</code> header of the response.</p>
     */
    ResponseContentType?: string;
    /**
     * <p>Sets the <code>Expires</code> header of the response.</p>
     */
    ResponseExpires?: Date;
    /**
     * <p>VersionId used to reference a specific version of the object.</p>
     */
    VersionId?: string;
    /**
     * <p>Specifies the algorithm to use when decrypting the object (for example,
     *          AES256).</p>
     */
    SSECustomerAlgorithm?: string;
    /**
     * <p>Specifies the customer-provided encryption key for Amazon S3 to encrypt the data. This
     *          value is used to decrypt the object when recovering it and must match the one used when
     *          storing the data. The key must be appropriate for use with the algorithm specified in the
     *             <code>x-amz-server-side-encryption-customer-algorithm</code> header.</p>
     */
    SSECustomerKey?: string;
    /**
     * <p>Specifies the 128-bit MD5 digest of the encryption key according to RFC 1321. Amazon S3 uses
     *          this header for message integrity check to ensure that the encryption key was transmitted
     *          without error.</p>
     */
    SSECustomerKeyMD5?: string;
    /**
     * <p>Confirms that the requester knows they will be charged for the request. Bucket
     *          owners need not specify this parameter in their requests. For information about downloading
     *          objects from requester pays buckets, see <a href="https://docs.aws.amazon.com/AmazonS3/latest/dev/ObjectsinRequesterPaysBuckets.html">Downloading Objects in
     *             Requestor Pays Buckets</a> in the <i>Amazon S3 User Guide</i>.</p>
     */
    RequestPayer?: RequestPayer | string;
    /**
     * <p>Part number of the object being read. This is a positive integer between 1 and 10,000.
     *          Effectively performs a 'ranged' GET request for the part specified. Useful for downloading
     *          just a part of an object.</p>
     */
    PartNumber?: number;
    /**
     * <p>The account ID of the expected bucket owner. If the bucket is owned by a different account, the request will fail with an HTTP <code>403 (Access Denied)</code> error.</p>
     */
    ExpectedBucketOwner?: string;
}
```

This method will return a `Promise` containing the local absolute path.
