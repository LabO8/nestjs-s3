---
id: objects
title: Objects service
sidebar_label: Objects
slug: /objects-service
---

## Introduction

The S3 objects service is used when we want to interact with objects in a bucket

With it you can do simple operations like puting, fetching and listing objects.

## Basic usage

The pre-requisites to use this service is just to have the main module initialized in our app, so we have access to all the services that it exports.
Later when we need a service we can simply:

```typescript
import { Injectable } from '@nestjs/common';
import { ObjectsService } from '@lab08/nestjs-s3';

@Injectable()
export class MyService {
  public constructor(private readonly objectsService: ObjectsService) {}
}
```

then we can simply call start using the service freely.

### Listing objects

To list all objects from a bucket we can simple call

```typescript
const result = await this.objectsService.listObjects('bucket-name', options);
```

which will return a `Promise` containing

```typescript
interface ListObjectsOutput {
  /**
   * <p>A flag that indicates whether Amazon S3 returned all of the results that satisfied the search
   *          criteria.</p>
   */
  IsTruncated?: boolean;
  /**
   * <p>Indicates where in the bucket listing begins. Marker is included in the response if it
   *          was sent with the request.</p>
   */
  Marker?: string;
  /**
   * <p>When response is truncated (the IsTruncated element value in the response is true), you
   *          can use the key name in this field as marker in the subsequent request to get next set of
   *          objects. Amazon S3 lists objects in alphabetical order Note: This element is returned only if
   *          you have delimiter request parameter specified. If response does not include the NextMarker
   *          and it is truncated, you can use the value of the last Key in the response as the marker in
   *          the subsequent request to get the next set of object keys.</p>
   */
  NextMarker?: string;
  /**
   * <p>Metadata about each object returned.</p>
   */
  Contents?: _Object[];
  /**
   * <p>The bucket name.</p>
   */
  Name?: string;
  /**
   * <p>Keys that begin with the indicated prefix.</p>
   */
  Prefix?: string;
  /**
   * <p>Causes keys that contain the same string between the prefix and the first occurrence of
   *          the delimiter to be rolled up into a single result element in the
   *             <code>CommonPrefixes</code> collection. These rolled-up keys are not returned elsewhere
   *          in the response. Each rolled-up result counts as only one return against the
   *             <code>MaxKeys</code> value.</p>
   */
  Delimiter?: string;
  /**
   * <p>The maximum number of keys returned in the response body.</p>
   */
  MaxKeys?: number;
  /**
   * <p>All of the keys (up to 1,000) rolled up in a common prefix count as a single return when calculating
   *          the number of returns. </p>
   *
   *          <p>A response can contain CommonPrefixes only if you specify a delimiter.</p>
   *
   *          <p>CommonPrefixes contains all (if there are any) keys between Prefix and the next
   *          occurrence of the string specified by the delimiter.</p>
   *
   *          <p> CommonPrefixes lists keys that act like subdirectories in the directory specified by
   *          Prefix.</p>
   *
   *          <p>For example, if the prefix is notes/ and the delimiter is a slash (/) as in
   *          notes/summer/july, the common prefix is notes/summer/. All of the keys that roll up into a
   *          common prefix count as a single return when calculating the number of returns.</p>
   */
  CommonPrefixes?: CommonPrefix[];
  /**
   * <p>Encoding type used by Amazon S3 to encode object keys in the response.</p>
   */
  EncodingType?: EncodingType | string;
}
```

it also accepts the following options

```typescript
    /**
     * <p>A delimiter is a character you use to group keys.</p>
     */
    Delimiter?: string;
    /**
     * <p>Requests Amazon S3 to encode the object keys in the response and specifies the encoding
     *          method to use. An object key may contain any Unicode character; however, XML 1.0 parser
     *          cannot parse some characters, such as characters with an ASCII value from 0 to 10. For
     *          characters that are not supported in XML 1.0, you can add this parameter to request that
     *          Amazon S3 encode the keys in the response.</p>
     */
    EncodingType?: EncodingType | string;
    /**
     * <p>Marker is where you want Amazon S3 to start listing from. Amazon S3 starts listing after
     *           this specified key. Marker can be any key in the bucket.</p>
     */
    Marker?: string;
    /**
     * <p>Sets the maximum number of keys returned in the response. By default the action returns up
     *          to 1,000 key names. The response might contain fewer keys but will never contain more.
     *       </p>
     */
    MaxKeys?: number;
    /**
     * <p>Limits the response to keys that begin with the specified prefix.</p>
     */
    Prefix?: string;
    /**
     * <p>Confirms that the requester knows that she or he will be charged for the list objects
     *          request. Bucket owners need not specify this parameter in their requests.</p>
     */
    RequestPayer?: RequestPayer | string;
    /**
     * <p>The account ID of the expected bucket owner. If the bucket is owned by a different account, the request will fail with an HTTP <code>403 (Access Denied)</code> error.</p>
     */
    ExpectedBucketOwner?: string;
```

### Puting objects in s3

There are two ways to put objects in s3, from a Buffer or from a local path.

**Keep in mind that all remotes are prefixed if you specified a prefix, when the module was initialized**

If you want to use a buffer you can use

```typescript
const result = await this.objectsService.putObject('bucket-name', buffer, remote, options);
```

or using a local path

```typescript
const result = await this.objectsService.putObjectFromPath('bucket-name', '/path-to-object'/, remote, options);
```

which will call the upper method and create the buffer automatically.

Both of them accept the following properties:

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

and as a result it will return a `Promise` with:

```typescript
interface PutObjectOutput {
  /**
   * <p> If the expiration is configured for the object (see <a href="https://docs.aws.amazon.com/AmazonS3/latest/API/API_PutBucketLifecycleConfiguration.html">PutBucketLifecycleConfiguration</a>), the response includes this header. It
   *          includes the expiry-date and rule-id key-value pairs that provide information about object
   *          expiration. The value of the rule-id is URL encoded.</p>
   */
  Expiration?: string;
  /**
   * <p>Entity tag for the uploaded object.</p>
   */
  ETag?: string;
  /**
   * <p>If you specified server-side encryption either with an Amazon Web Services KMS key
   *          or Amazon S3-managed encryption key in your PUT request, the response includes this header. It
   *          confirms the encryption algorithm that Amazon S3 used to encrypt the object.</p>
   */
  ServerSideEncryption?: ServerSideEncryption | string;
  /**
   * <p>Version of the object.</p>
   */
  VersionId?: string;
  /**
   * <p>If server-side encryption with a customer-provided encryption key was requested, the
   *          response will include this header confirming the encryption algorithm used.</p>
   */
  SSECustomerAlgorithm?: string;
  /**
   * <p>If server-side encryption with a customer-provided encryption key was requested, the
   *          response will include this header to provide round-trip message integrity verification of
   *          the customer-provided encryption key.</p>
   */
  SSECustomerKeyMD5?: string;
  /**
   * <p>If <code>x-amz-server-side-encryption</code> is present and has the value of
   *             <code>aws:kms</code>, this header specifies the ID of the Amazon Web Services Key Management Service
   *          (Amazon Web Services KMS) symmetric customer managed key that was used for the
   *          object. </p>
   */
  SSEKMSKeyId?: string;
  /**
   * <p>If present, specifies the Amazon Web Services KMS Encryption Context to use for object encryption. The
   *          value of this header is a base64-encoded UTF-8 string holding JSON with the encryption
   *          context key-value pairs.</p>
   */
  SSEKMSEncryptionContext?: string;
  /**
   * <p>Indicates whether the uploaded object uses an S3 Bucket Key for server-side encryption with Amazon Web Services KMS (SSE-KMS).</p>
   */
  BucketKeyEnabled?: boolean;
  /**
   * <p>If present, indicates that the requester was successfully charged for the
   *          request.</p>
   */
  RequestCharged?: RequestCharged | string;
}
```

### Geting objects

If we want to fetch an object, we can use:

```typescript
const result = await this.objectsService.getObject('bucket-name', 'remote', options);
```

Which accepts:

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

and will return a `Promise` with the following:

```typescript
interface GetObjectOutput {
  /**
   * <p>Object data.</p>
   */
  Body?: Readable | ReadableStream | Blob;
  /**
   * <p>Specifies whether the object retrieved was (true) or was not (false) a Delete Marker. If
   *          false, this response header does not appear in the response.</p>
   */
  DeleteMarker?: boolean;
  /**
   * <p>Indicates that a range of bytes was specified.</p>
   */
  AcceptRanges?: string;
  /**
   * <p>If the object expiration is configured (see PUT Bucket lifecycle), the response includes
   *          this header. It includes the expiry-date and rule-id key-value pairs providing object
   *          expiration information. The value of the rule-id is URL encoded.</p>
   */
  Expiration?: string;
  /**
   * <p>Provides information about object restoration action and expiration time of the
   *          restored object copy.</p>
   */
  Restore?: string;
  /**
   * <p>Creation date of the object.</p>
   */
  LastModified?: Date;
  /**
   * <p>Size of the body in bytes.</p>
   */
  ContentLength?: number;
  /**
   * <p>An ETag is an opaque identifier assigned by a web server to a specific version of a
   *          resource found at a URL.</p>
   */
  ETag?: string;
  /**
   * <p>This is set to the number of metadata entries not returned in <code>x-amz-meta</code>
   *          headers. This can happen if you create metadata using an API like SOAP that supports more
   *          flexible metadata than the REST API. For example, using SOAP, you can create metadata whose
   *          values are not legal HTTP headers.</p>
   */
  MissingMeta?: number;
  /**
   * <p>Version of the object.</p>
   */
  VersionId?: string;
  /**
   * <p>Specifies caching behavior along the request/reply chain.</p>
   */
  CacheControl?: string;
  /**
   * <p>Specifies presentational information for the object.</p>
   */
  ContentDisposition?: string;
  /**
   * <p>Specifies what content encodings have been applied to the object and thus what decoding
   *          mechanisms must be applied to obtain the media-type referenced by the Content-Type header
   *          field.</p>
   */
  ContentEncoding?: string;
  /**
   * <p>The language the content is in.</p>
   */
  ContentLanguage?: string;
  /**
   * <p>The portion of the object returned in the response.</p>
   */
  ContentRange?: string;
  /**
   * <p>A standard MIME type describing the format of the object data.</p>
   */
  ContentType?: string;
  /**
   * <p>The date and time at which the object is no longer cacheable.</p>
   */
  Expires?: Date;
  /**
   * <p>If the bucket is configured as a website, redirects requests for this object to another
   *          object in the same bucket or to an external URL. Amazon S3 stores the value of this header in
   *          the object metadata.</p>
   */
  WebsiteRedirectLocation?: string;
  /**
   * <p>The server-side encryption algorithm used when storing this object in Amazon S3 (for example,
   *          AES256, aws:kms).</p>
   */
  ServerSideEncryption?: ServerSideEncryption | string;
  /**
   * <p>A map of metadata to store with the object in S3.</p>
   */
  Metadata?: {
    [key: string]: string;
  };
  /**
   * <p>If server-side encryption with a customer-provided encryption key was requested, the
   *          response will include this header confirming the encryption algorithm used.</p>
   */
  SSECustomerAlgorithm?: string;
  /**
   * <p>If server-side encryption with a customer-provided encryption key was requested, the
   *          response will include this header to provide round-trip message integrity verification of
   *          the customer-provided encryption key.</p>
   */
  SSECustomerKeyMD5?: string;
  /**
   * <p>If present, specifies the ID of the Amazon Web Services Key Management Service (Amazon Web Services KMS) symmetric
   *          customer managed key that was used for the object.</p>
   */
  SSEKMSKeyId?: string;
  /**
   * <p>Indicates whether the object uses an S3 Bucket Key for server-side encryption with Amazon Web Services KMS (SSE-KMS).</p>
   */
  BucketKeyEnabled?: boolean;
  /**
   * <p>Provides storage class information of the object. Amazon S3 returns this header for all
   *          objects except for S3 Standard storage class objects.</p>
   */
  StorageClass?: StorageClass | string;
  /**
   * <p>If present, indicates that the requester was successfully charged for the
   *          request.</p>
   */
  RequestCharged?: RequestCharged | string;
  /**
   * <p>Amazon S3 can return this if your request involves a bucket that is either a source or
   *          destination in a replication rule.</p>
   */
  ReplicationStatus?: ReplicationStatus | string;
  /**
   * <p>The count of parts this object has.</p>
   */
  PartsCount?: number;
  /**
   * <p>The number of tags, if any, on the object.</p>
   */
  TagCount?: number;
  /**
   * <p>The Object Lock mode currently in place for this object.</p>
   */
  ObjectLockMode?: ObjectLockMode | string;
  /**
   * <p>The date and time when this object's Object Lock will expire.</p>
   */
  ObjectLockRetainUntilDate?: Date;
  /**
   * <p>Indicates whether this object has an active legal hold. This field is only returned if
   *          you have permission to view an object's legal hold status. </p>
   */
  ObjectLockLegalHoldStatus?: ObjectLockLegalHoldStatus | string;
}
```

### Deleting object

If we want to remove an object from a bucket, we can use:

```typescript
const result = await this.objectsService.deleteObject('bucket-name', 'remote', options);
```

**Again, all if you specified a prefix in your module init, all remotes will be auto prefixed.**

This method accepts the following options:

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

and will return a `Promise` with the following:

```typescript
interface DeleteObjectOutput {
  /**
   * <p>Specifies whether the versioned object that was permanently deleted was (true) or was
   *          not (false) a delete marker.</p>
   */
  DeleteMarker?: boolean;
  /**
   * <p>Returns the version ID of the delete marker created as a result of the DELETE
   *          operation.</p>
   */
  VersionId?: string;
  /**
   * <p>If present, indicates that the requester was successfully charged for the
   *          request.</p>
   */
  RequestCharged?: RequestCharged | string;
}
```

### Deleting multiple objects

We can also bulk delete objects by using:

```typescript
const result = await this.objectsService.deleteObjects('bucket-name', ['remote'], options);
```

The method accepts:

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

and wil return a `Promise` with:

```typescript
interface DeleteObjectsOutput {
  /**
   * <p>Container element for a successful delete. It identifies the object that was
   *          successfully deleted.</p>
   */
  Deleted?: DeletedObject[];
  /**
   * <p>If present, indicates that the requester was successfully charged for the
   *          request.</p>
   */
  RequestCharged?: RequestCharged | string;
  /**
   * <p>Container for a failed delete action that describes the object that Amazon S3 attempted to
   *          delete and the error it encountered.</p>
   */
  Errors?: _Error[];
}
```
