---
id: signed-url
title: Signed url service
sidebar_label: Signed url service
slug: /signed-url-service
---

## Introduction

We use Signed url service, to generate all kind of signed urls, that we will need.

## Basic usage

The pre-requisites to use this service is just to have the main module initialized in our app, so we have access to all the services that it exports.
Later when we need a service we can simply:

```typescript
import { Injectable } from '@nestjs/common';
import { SignedUrlService } from '@lab08/nestjs-s3';

@Injectable()
export class MyService {
  public constructor(private readonly signedUrlService: SignedUrlService) {}
}
```

then we can simply call start using the service freely.

### PUT signed url

In order to get a signed url you can call

```typescript
const result = this.signedUrlService.getPutSignedUrl('bucket', 'remote', expiresIn, options);
```

it accepts the following:

```typescript
type PutObjectOptions {
     /**
     * <p>The canned ACL to apply to the object. For more information, see <a href="https://docs.aws.amazon.com/AmazonS3/latest/dev/acl-overview.html#CannedACL">Canned
     *       ACL</a>.</p>
     *          <p>This action is not supported by Amazon S3 on Outposts.</p>
     */
    ACL?: ObjectCannedACL | string;
    /**
     * <p> Can be used to specify caching behavior along the request/reply chain. For more
     *          information, see <a href="http://www.w3.org/Protocols/rfc2616/rfc2616-sec14.html#sec14.9">http://www.w3.org/Protocols/rfc2616/rfc2616-sec14.html#sec14.9</a>.</p>
     */
    CacheControl?: string;
    /**
     * <p>Specifies presentational information for the object. For more information, see <a href="http://www.w3.org/Protocols/rfc2616/rfc2616-sec19.html#sec19.5.1">http://www.w3.org/Protocols/rfc2616/rfc2616-sec19.html#sec19.5.1</a>.</p>
     */
    ContentDisposition?: string;
    /**
     * <p>Specifies what content encodings have been applied to the object and thus what decoding
     *          mechanisms must be applied to obtain the media-type referenced by the Content-Type header
     *          field. For more information, see <a href="http://www.w3.org/Protocols/rfc2616/rfc2616-sec14.html#sec14.11">http://www.w3.org/Protocols/rfc2616/rfc2616-sec14.html#sec14.11</a>.</p>
     */
    ContentEncoding?: string;
    /**
     * <p>The language the content is in.</p>
     */
    ContentLanguage?: string;
    /**
     * <p>Size of the body in bytes. This parameter is useful when the size of the body cannot be
     *          determined automatically. For more information, see <a href="http://www.w3.org/Protocols/rfc2616/rfc2616-sec14.html#sec14.13">http://www.w3.org/Protocols/rfc2616/rfc2616-sec14.html#sec14.13</a>.</p>
     */
    ContentLength?: number;
    /**
     * <p>The base64-encoded 128-bit MD5 digest of the message (without the headers) according to
     *          RFC 1864. This header can be used as a message integrity check to verify that the data is
     *          the same data that was originally sent. Although it is optional, we recommend using the
     *          Content-MD5 mechanism as an end-to-end integrity check. For more information about REST
     *          request authentication, see <a href="https://docs.aws.amazon.com/AmazonS3/latest/dev/RESTAuthentication.html">REST
     *             Authentication</a>.</p>
     */
    ContentMD5?: string;
    /**
     * <p>A standard MIME type describing the format of the contents. For more information, see
     *             <a href="http://www.w3.org/Protocols/rfc2616/rfc2616-sec14.html#sec14.17">http://www.w3.org/Protocols/rfc2616/rfc2616-sec14.html#sec14.17</a>.</p>
     */
    ContentType?: string;
    /**
     * <p>The date and time at which the object is no longer cacheable. For more information, see
     *             <a href="http://www.w3.org/Protocols/rfc2616/rfc2616-sec14.html#sec14.21">http://www.w3.org/Protocols/rfc2616/rfc2616-sec14.html#sec14.21</a>.</p>
     */
    Expires?: Date;
    /**
     * <p>Gives the grantee READ, READ_ACP, and WRITE_ACP permissions on the
     *       object.</p>
     *          <p>This action is not supported by Amazon S3 on Outposts.</p>
     */
    GrantFullControl?: string;
    /**
     * <p>Allows grantee to read the object data and its
     *       metadata.</p>
     *          <p>This action is not supported by Amazon S3 on Outposts.</p>
     */
    GrantRead?: string;
    /**
     * <p>Allows grantee to read the object ACL.</p>
     *          <p>This action is not supported by Amazon S3 on Outposts.</p>
     */
    GrantReadACP?: string;
    /**
     * <p>Allows grantee to write the ACL for the applicable
     *       object.</p>
     *          <p>This action is not supported by Amazon S3 on Outposts.</p>
     */
    GrantWriteACP?: string;
    /**
     * <p>A map of metadata to store with the object in S3.</p>
     */
    Metadata?: {
        [key: string]: string;
    };
    /**
     * <p>The server-side encryption algorithm used when storing this object in Amazon S3 (for example,
     *          AES256, aws:kms).</p>
     */
    ServerSideEncryption?: ServerSideEncryption | string;
    /**
     * <p>By default, Amazon S3 uses the STANDARD Storage Class to store newly created objects. The
     *          STANDARD storage class provides high durability and high availability. Depending on
     *          performance needs, you can specify a different Storage Class. Amazon S3 on Outposts only uses
     *          the OUTPOSTS Storage Class. For more information, see <a href="https://docs.aws.amazon.com/AmazonS3/latest/dev/storage-class-intro.html">Storage Classes</a> in the
     *          <i>Amazon S3 User Guide</i>.</p>
     */
    StorageClass?: StorageClass | string;
    /**
     * <p>If the bucket is configured as a website, redirects requests for this object to another
     *          object in the same bucket or to an external URL. Amazon S3 stores the value of this header in
     *          the object metadata. For information about object metadata, see <a href="https://docs.aws.amazon.com/AmazonS3/latest/dev/UsingMetadata.html">Object Key and Metadata</a>.</p>
     *
     *          <p>In the following example, the request header sets the redirect to an object
     *          (anotherPage.html) in the same bucket:</p>
     *
     *          <p>
     *             <code>x-amz-website-redirect-location: /anotherPage.html</code>
     *          </p>
     *
     *          <p>In the following example, the request header sets the object redirect to another
     *          website:</p>
     *
     *          <p>
     *             <code>x-amz-website-redirect-location: http://www.example.com/</code>
     *          </p>
     *
     *          <p>For more information about website hosting in Amazon S3, see <a href="https://docs.aws.amazon.com/AmazonS3/latest/dev/WebsiteHosting.html">Hosting Websites on Amazon S3</a> and <a href="https://docs.aws.amazon.com/AmazonS3/latest/dev/how-to-page-redirect.html">How to Configure Website Page
     *             Redirects</a>. </p>
     */
    WebsiteRedirectLocation?: string;
    /**
     * <p>Specifies the algorithm to use to when encrypting the object (for example,
     *          AES256).</p>
     */
    SSECustomerAlgorithm?: string;
    /**
     * <p>Specifies the customer-provided encryption key for Amazon S3 to use in encrypting data. This
     *          value is used to store the object and then it is discarded; Amazon S3 does not store the
     *          encryption key. The key must be appropriate for use with the algorithm specified in the
     *             <code>x-amz-server-side-encryption-customer-algorithm</code> header.</p>
     */
    SSECustomerKey?: string;
    /**
     * <p>Specifies the 128-bit MD5 digest of the encryption key according to RFC 1321. Amazon S3 uses
     *          this header for a message integrity check to ensure that the encryption key was transmitted
     *          without error.</p>
     */
    SSECustomerKeyMD5?: string;
    /**
     * <p>If <code>x-amz-server-side-encryption</code> is present and has the value of
     *          <code>aws:kms</code>, this header specifies the ID of the Amazon Web Services Key Management Service
     *          (Amazon Web Services KMS) symmetrical customer managed key that was used for the
     *          object. If you specify <code>x-amz-server-side-encryption:aws:kms</code>, but do not
     *          provide<code> x-amz-server-side-encryption-aws-kms-key-id</code>, Amazon S3 uses the Amazon Web Services
     *          managed key to protect the data. If the KMS key does not exist in the same account
     *          issuing the command, you must use the full ARN and not just the ID.
     *       </p>
     */
    SSEKMSKeyId?: string;
    /**
     * <p>Specifies the Amazon Web Services KMS Encryption Context to use for object encryption. The value of this
     *          header is a base64-encoded UTF-8 string holding JSON with the encryption context key-value
     *          pairs.</p>
     */
    SSEKMSEncryptionContext?: string;
    /**
     * <p>Specifies whether Amazon S3 should use an S3 Bucket Key for object encryption with server-side encryption using AWS KMS (SSE-KMS). Setting this header to <code>true</code> causes Amazon S3 to use an S3 Bucket Key for object encryption with SSE-KMS.</p>
     *          <p>Specifying this header with a PUT action doesn’t affect bucket-level settings for S3 Bucket Key.</p>
     */
    BucketKeyEnabled?: boolean;
    /**
     * <p>Confirms that the requester knows that they will be charged for the request. Bucket
     *          owners need not specify this parameter in their requests. For information about downloading
     *          objects from requester pays buckets, see <a href="https://docs.aws.amazon.com/AmazonS3/latest/dev/ObjectsinRequesterPaysBuckets.html">Downloading Objects in
     *             Requestor Pays Buckets</a> in the <i>Amazon S3 User Guide</i>.</p>
     */
    RequestPayer?: RequestPayer | string;
    /**
     * <p>The tag-set for the object. The tag-set must be encoded as URL Query parameters. (For
     *          example, "Key1=Value1")</p>
     */
    Tagging?: string;
    /**
     * <p>The Object Lock mode that you want to apply to this object.</p>
     */
    ObjectLockMode?: ObjectLockMode | string;
    /**
     * <p>The date and time when you want this object's Object Lock to expire. Must be formatted
     *          as a timestamp parameter.</p>
     */
    ObjectLockRetainUntilDate?: Date;
    /**
     * <p>Specifies whether a legal hold will be applied to this object. For more information
     *          about S3 Object Lock, see <a href="https://docs.aws.amazon.com/AmazonS3/latest/dev/object-lock.html">Object
     *          Lock</a>.</p>
     */
    ObjectLockLegalHoldStatus?: ObjectLockLegalHoldStatus | string;
    /**
     * <p>The account ID of the expected bucket owner. If the bucket is owned by a different account, the request will fail with an HTTP <code>403 (Access Denied)</code> error.</p>
     */
    ExpectedBucketOwner?: string;
}
```

which will return a `Promise` wih the following:

```typescript
export type PutSignedUrl = {
  remote: string;
  url: string;
};
```

### GET signed url

In order to get a signed url you can call

```typescript
const result = this.signedUrlService.getSignedUrl('bucket', 'remote', expiresIn, options);
```

which accepts the following options:

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
     * <p>Specifies the algorithm to use to when decrypting the object (for example,
     *          AES256).</p>
     */
    SSECustomerAlgorithm?: string;
    /**
     * <p>Specifies the customer-provided encryption key for Amazon S3 used to encrypt the data. This
     *          value is used to decrypt the object when recovering it and must match the one used when
     *          storing the data. The key must be appropriate for use with the algorithm specified in the
     *             <code>x-amz-server-side-encryption-customer-algorithm</code> header.</p>
     */
    SSECustomerKey?: string;
    /**
     * <p>Specifies the 128-bit MD5 digest of the encryption key according to RFC 1321. Amazon S3 uses
     *          this header for a message integrity check to ensure that the encryption key was transmitted
     *          without error.</p>
     */
    SSECustomerKeyMD5?: string;
    /**
     * <p>Confirms that the requester knows that they will be charged for the request. Bucket
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

and returns a `Promise` with a string containting the url

### DELETE presiged url

We can also create a delete presigned urls.

If we want to delete one object, we can:

```typescript
const result = this.signedUrlService.getDeleteSignedUrl('bucket', 'remote', expiresIn, options);
```

which takes:

```typescript
type DeleteObjectOptions {
    /**
     * <p>The concatenation of the authentication device's serial number, a space, and the value
     *          that is displayed on your authentication device. Required to permanently delete a versioned
     *          object if versioning is configured with MFA delete enabled.</p>
     */
    MFA?: string;
    /**
     * <p>VersionId used to reference a specific version of the object.</p>
     */
    VersionId?: string;
    /**
     * <p>Confirms that the requester knows that they will be charged for the request. Bucket
     *          owners need not specify this parameter in their requests. For information about downloading
     *          objects from requester pays buckets, see <a href="https://docs.aws.amazon.com/AmazonS3/latest/dev/ObjectsinRequesterPaysBuckets.html">Downloading Objects in
     *             Requestor Pays Buckets</a> in the <i>Amazon S3 User Guide</i>.</p>
     */
    RequestPayer?: RequestPayer | string;
    /**
     * <p>Indicates whether S3 Object Lock should bypass Governance-mode restrictions to process
     *          this operation. To use this header, you must have the <code>s3:PutBucketPublicAccessBlock</code>
     *          permission.</p>
     */
    BypassGovernanceRetention?: boolean;
    /**
     * <p>The account ID of the expected bucket owner. If the bucket is owned by a different account, the request will fail with an HTTP <code>403 (Access Denied)</code> error.</p>
     */
    ExpectedBucketOwner?: string;
}
```

and returns a `Promise` with the string containing the url.

Or delete multiple objects with

```typescript
const result = this.signedUrlService.getDeleteObjectsSignedUrl('bucket', ['remote'], expiresIn, options);
```

```typescript
type DeleteObjectsOptions = {
  /**
   * <p>The concatenation of the authentication device's serial number, a space, and the value
   *          that is displayed on your authentication device. Required to permanently delete a versioned
   *          object if versioning is configured with MFA delete enabled.</p>
   */
  MFA?: string;
  /**
   * <p>Confirms that the requester knows that they will be charged for the request. Bucket
   *          owners need not specify this parameter in their requests. For information about downloading
   *          objects from requester pays buckets, see <a href="https://docs.aws.amazon.com/AmazonS3/latest/dev/ObjectsinRequesterPaysBuckets.html">Downloading Objects in
   *             Requestor Pays Buckets</a> in the <i>Amazon S3 User Guide</i>.</p>
   */
  RequestPayer?: RequestPayer | string;
  /**
   * <p>Specifies whether you want to delete this object even if it has a Governance-type Object
   *          Lock in place. To use this header, you must have the <code>s3:PutBucketPublicAccessBlock</code>
   *          permission.</p>
   */
  BypassGovernanceRetention?: boolean;
  /**
   * <p>The account ID of the expected bucket owner. If the bucket is owned by a different account, the request will fail with an HTTP <code>403 (Access Denied)</code> error.</p>
   */
  ExpectedBucketOwner?: string;
};
```

which will return a `Promise` with a string containing the url.
