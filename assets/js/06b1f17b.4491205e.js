"use strict";(self.webpackChunksite=self.webpackChunksite||[]).push([[894],{4010:(e,n,t)=>{t.r(n),t.d(n,{assets:()=>o,contentTitle:()=>a,default:()=>u,frontMatter:()=>c,metadata:()=>r,toc:()=>l});var i=t(4848),s=t(8453);const c={id:"buckets",title:"Buckets service",sidebar_label:"Buckets",slug:"/buckets-service"},a=void 0,r={id:"buckets",title:"Buckets service",description:"Introduction",source:"@site/docs/buckets.md",sourceDirName:".",slug:"/buckets-service",permalink:"/nestjs-s3/buckets-service",draft:!1,unlisted:!1,editUrl:"https://github.com/LabO8/nestjs-s3/docs/buckets.md",tags:[],version:"current",frontMatter:{id:"buckets",title:"Buckets service",sidebar_label:"Buckets",slug:"/buckets-service"},sidebar:"docsSidebar",previous:{title:"Getting Started",permalink:"/nestjs-s3/"},next:{title:"Objects",permalink:"/nestjs-s3/objects-service"}},o={},l=[{value:"Introduction",id:"introduction",level:2},{value:"Basic usage",id:"basic-usage",level:2},{value:"Listing buckets",id:"listing-buckets",level:3},{value:"Creating buckets",id:"creating-buckets",level:3},{value:"Deleting buckets",id:"deleting-buckets",level:3},{value:"Listing buckets",id:"listing-buckets-1",level:3},{value:"Searching for a bucket by name",id:"searching-for-a-bucket-by-name",level:3},{value:"Upading a bucket",id:"upading-a-bucket",level:3},{value:"Tagging",id:"tagging",level:4},{value:"Updating CORS",id:"updating-cors",level:4},{value:"Updating ACL",id:"updating-acl",level:4},{value:"Updating Logging",id:"updating-logging",level:4},{value:"Updating encryption",id:"updating-encryption",level:4},{value:"Updating accelerate configuration",id:"updating-accelerate-configuration",level:4}];function d(e){const n={code:"code",h2:"h2",h3:"h3",h4:"h4",li:"li",p:"p",pre:"pre",ul:"ul",...(0,s.R)(),...e.components};return(0,i.jsxs)(i.Fragment,{children:[(0,i.jsx)(n.h2,{id:"introduction",children:"Introduction"}),"\n",(0,i.jsx)(n.p,{children:"The S3 Bucket service is used when we want to make changes to buckets."}),"\n",(0,i.jsx)(n.p,{children:"We can do multiple things with this service like:"}),"\n",(0,i.jsxs)(n.ul,{children:["\n",(0,i.jsx)(n.li,{children:"create buckets"}),"\n",(0,i.jsx)(n.li,{children:"list buckets"}),"\n",(0,i.jsx)(n.li,{children:"delete buckets"}),"\n",(0,i.jsx)(n.li,{children:"tag buckets, etc."}),"\n"]}),"\n",(0,i.jsx)(n.h2,{id:"basic-usage",children:"Basic usage"}),"\n",(0,i.jsx)(n.p,{children:"The pre-requisites to use this service are to have the main module initialized in our app, so we can access all the services it exports.\nLater, when we need a service we can simply:"}),"\n",(0,i.jsx)(n.pre,{children:(0,i.jsx)(n.code,{className:"language-typescript",children:"import { Injectable } from '@nestjs/common';\nimport { BucketsService } from '@lab08/nestjs-s3';\n\n@Injectable()\nexport class MyService {\n  public constructor(private readonly bucketService: BucketService) {}\n}\n"})}),"\n",(0,i.jsx)(n.p,{children:"then we can simply call start using the service freely."}),"\n",(0,i.jsx)(n.h3,{id:"listing-buckets",children:"Listing buckets"}),"\n",(0,i.jsxs)(n.p,{children:["One of the things we can do is list buckets. In other to do that we can use the ",(0,i.jsx)(n.code,{children:"list"})," method of the service"]}),"\n",(0,i.jsx)(n.pre,{children:(0,i.jsx)(n.code,{className:"language-typescript",children:"const buckets = await this.bucketService.list();\n"})}),"\n",(0,i.jsxs)(n.p,{children:["which will return a ",(0,i.jsx)(n.code,{children:"Promise"})," containing"]}),"\n",(0,i.jsx)(n.pre,{children:(0,i.jsx)(n.code,{className:"language-typescript",children:"interface ListBucketsCommandOutput {\n  /**\n   * The list of buckets owned by the requestor.\n   */\n  Buckets?: Bucket[];\n  /**\n   * The owner of the buckets listed.\n   */\n  Owner?: Owner;\n  /**\n   * Metadata pertaining to this request.\n   */\n  $metadata: ResponseMetadata;\n}\n"})}),"\n",(0,i.jsx)(n.h3,{id:"creating-buckets",children:"Creating buckets"}),"\n",(0,i.jsx)(n.p,{children:"When we need to create a new bucket we can just simply call"}),"\n",(0,i.jsx)(n.pre,{children:(0,i.jsx)(n.code,{className:"language-typescript",children:"const bucket = await this.bucketService.create('test-bucket');\n"})}),"\n",(0,i.jsx)(n.p,{children:"or"}),"\n",(0,i.jsx)(n.pre,{children:(0,i.jsx)(n.code,{className:"language-typescript",children:"const bucket = await this.bucketService.create('test-bucket', options);\n"})}),"\n",(0,i.jsx)(n.p,{children:"where options can be"}),"\n",(0,i.jsx)(n.pre,{children:(0,i.jsx)(n.code,{className:"language-typescript",children:"export interface CreateBucketRequest {\n  /**\n   * The canned ACL to apply to the bucket.\n   */\n  ACL?: BucketCannedACL | string;\n  /**\n   * The configuration information for the bucket.\n   */\n  CreateBucketConfiguration?: CreateBucketConfiguration;\n  /**\n   * Allows grantee the read, write, read ACP, and write ACP permissions on the bucket.\n   */\n  GrantFullControl?: string;\n  /**\n   * Allows grantee to list the objects in the bucket.\n   */\n  GrantRead?: string;\n  /**\n   * Allows grantee to read the bucket ACL.\n   */\n  GrantReadACP?: string;\n  /**\n   * Allows grantee to create new objects in the bucket.\n   * For the bucket and object owners of existing objects, it also allows deletions and overwrites.\n   */\n  GrantWrite?: string;\n  /**\n   * Allows grantee to write the ACL for the applicable bucket.\n   */\n  GrantWriteACP?: string;\n  /**\n   * Specifies whether you want S3 Object Lock for the new bucket.\n   */\n  ObjectLockEnabledForBucket?: boolean;\n}\n"})}),"\n",(0,i.jsxs)(n.p,{children:["which will return a ",(0,i.jsx)(n.code,{children:"Promise"})," containing"]}),"\n",(0,i.jsx)(n.pre,{children:(0,i.jsx)(n.code,{className:"language-typescript",children:"interface CreateBucketCommandOutput {\n  /**\n   * Specifies the Region where the bucket will be created. If you are creating a bucket on\n   *          the US East (N. Virginia) Region (us-east-1), you do not need to specify the\n   *          location.\n   */\n  Location?: string;\n  /**\n   * Metadata pertaining to this request.\n   */\n  $metadata: ResponseMetadata;\n}\n"})}),"\n",(0,i.jsx)(n.h3,{id:"deleting-buckets",children:"Deleting buckets"}),"\n",(0,i.jsxs)(n.p,{children:["After we already have a bucket, we can easily remove it. This can be done by calling the ",(0,i.jsx)(n.code,{children:"delete"})," method."]}),"\n",(0,i.jsx)(n.pre,{children:(0,i.jsx)(n.code,{className:"language-typescript",children:"const result = await this.bucketService.delete('test-bucket');\n"})}),"\n",(0,i.jsxs)(n.p,{children:["which will return a ",(0,i.jsx)(n.code,{children:"Promise"})," with the delete operation output"]}),"\n",(0,i.jsx)(n.pre,{children:(0,i.jsx)(n.code,{className:"language-typescript",children:"interface DeleteBucketCommandOutput {\n  /**\n   * Metadata pertaining to this request.\n   */\n  $metadata: ResponseMetadata;\n}\n"})}),"\n",(0,i.jsx)(n.h3,{id:"listing-buckets-1",children:"Listing buckets"}),"\n",(0,i.jsxs)(n.p,{children:["We can call the ",(0,i.jsx)(n.code,{children:"list"})," method if we want to get all our existing buckets."]}),"\n",(0,i.jsx)(n.pre,{children:(0,i.jsx)(n.code,{className:"language-typescript",children:"const result = await this.bucketService.list();\n"})}),"\n",(0,i.jsxs)(n.p,{children:["which will return a list of all the buckets, that we have access to. It returns a ",(0,i.jsx)(n.code,{children:"Promise"})," with the following:"]}),"\n",(0,i.jsx)(n.pre,{children:(0,i.jsx)(n.code,{className:"language-typescript",children:"export interface ListBucketsCommandOutput {\n  /**\n   * <p>The list of buckets owned by the requestor.</p>\n   */\n  Buckets?: Bucket[];\n  /**\n   * <p>The owner of the buckets listed.</p>\n   */\n  Owner?: Owner;\n\n  /**\n   * Metadata pertaining to this request.\n   */\n  $metadata: ResponseMetadata;\n}\n"})}),"\n",(0,i.jsx)(n.h3,{id:"searching-for-a-bucket-by-name",children:"Searching for a bucket by name"}),"\n",(0,i.jsxs)(n.p,{children:["If we want to see if we have a bucket with a specific name, we can use the ",(0,i.jsx)(n.code,{children:"find"})," method and pass the name of the bucket we want."]}),"\n",(0,i.jsx)(n.pre,{children:(0,i.jsx)(n.code,{className:"language-typescript",children:"const result = await this.bucketService.find('test');\n"})}),"\n",(0,i.jsxs)(n.p,{children:["If found this method will return a ",(0,i.jsx)(n.code,{children:"Promise"})," with a ",(0,i.jsx)(n.code,{children:"Bucket"})," object, or if it cannot find a bucket - ",(0,i.jsx)(n.code,{children:"undefined"}),"."]}),"\n",(0,i.jsx)(n.h3,{id:"upading-a-bucket",children:"Upading a bucket"}),"\n",(0,i.jsx)(n.h4,{id:"tagging",children:"Tagging"}),"\n",(0,i.jsx)(n.p,{children:"We can do other things with a bucket like updating tags"}),"\n",(0,i.jsx)(n.pre,{children:(0,i.jsx)(n.code,{className:"language-typescript",children:"const result = await this.bucketService.tagging('test');\n"})}),"\n",(0,i.jsxs)(n.p,{children:["which will return a ",(0,i.jsx)(n.code,{children:"Promise"})," with the following:"]}),"\n",(0,i.jsx)(n.pre,{children:(0,i.jsx)(n.code,{className:"language-typescript",children:"export interface GetBucketTaggingCommandOutput {\n  /**\n   * <p>Contains the tag set.</p>\n   */\n  TagSet: Tag[] | undefined;\n\n  /**\n   * Metadata pertaining to this request.\n   */\n  $metadata: ResponseMetadata;\n}\n"})}),"\n",(0,i.jsx)(n.h4,{id:"updating-cors",children:"Updating CORS"}),"\n",(0,i.jsx)(n.p,{children:"We can update the exsisting cors"}),"\n",(0,i.jsx)(n.pre,{children:(0,i.jsx)(n.code,{className:"language-typescript",children:"const result = await this.bucketService.updateCors('test', options);\n"})}),"\n",(0,i.jsx)(n.p,{children:"which can receive the following options"}),"\n",(0,i.jsx)(n.pre,{children:(0,i.jsx)(n.code,{className:"language-typescript",children:"export interface CORSConfiguration {\n  /**\n   * <p>A set of origins and methods (cross-origin access you want to allow). You can add\n   *          up to 100 rules to the configuration.</p>\n   */\n  CORSRules: CORSRule[] | undefined;\n}\n"})}),"\n",(0,i.jsxs)(n.p,{children:["which will return a ",(0,i.jsx)(n.code,{children:"Promise"})," with"]}),"\n",(0,i.jsx)(n.pre,{children:(0,i.jsx)(n.code,{className:"language-typescript",children:"export interface PutBucketCorsCommandOutput {\n  /**\n   * Metadata pertaining to this request.\n   */\n  $metadata: ResponseMetadata;\n}\n"})}),"\n",(0,i.jsx)(n.h4,{id:"updating-acl",children:"Updating ACL"}),"\n",(0,i.jsx)(n.pre,{children:(0,i.jsx)(n.code,{className:"language-typescript",children:"const result = await this.bucketService.updateAcl('test', options);\n"})}),"\n",(0,i.jsx)(n.p,{children:"which can receive the following options"}),"\n",(0,i.jsx)(n.pre,{children:(0,i.jsx)(n.code,{className:"language-typescript",children:'export interface CORSConfiguration {\n  /**\n   * <p>The canned ACL to apply to the bucket.</p>\n   */\n  ACL?: BucketCannedACL | string;\n  /**\n   * <p>Contains the elements that set the ACL permissions for an object per grantee.</p>\n   */\n  AccessControlPolicy?: AccessControlPolicy;\n  /**\n   * <p>The base64-encoded 128-bit MD5 digest of the data. This header must be used as a message\n   *          integrity check to verify that the request body was not corrupted in transit. For more\n   *          information, go to <a href="http://www.ietf.org/rfc/rfc1864.txt">RFC\n   *          1864.</a>\n   *          </p>\n   *          <p>For requests made using the Amazon Web Services Command Line Interface (CLI) or Amazon Web Services SDKs, this field is calculated automatically.</p>\n   */\n  ContentMD5?: string;\n  /**\n   * <p>Allows grantee the read, write, read ACP, and write ACP permissions on the\n   *          bucket.</p>\n   */\n  GrantFullControl?: string;\n  /**\n   * <p>Allows grantee to list the objects in the bucket.</p>\n   */\n  GrantRead?: string;\n  /**\n   * <p>Allows grantee to read the bucket ACL.</p>\n   */\n  GrantReadACP?: string;\n  /**\n   * <p>Allows grantee to create new objects in the bucket.</p>\n   *          <p>For the bucket and object owners of existing objects, also allows deletions and overwrites of those objects.</p>\n   */\n  GrantWrite?: string;\n  /**\n   * <p>Allows grantee to write the ACL for the applicable bucket.</p>\n   */\n  GrantWriteACP?: string;\n  /**\n   * <p>The account ID of the expected bucket owner. If different account owns the bucket, the request will fail with an HTTP <code>403 (Access Denied)</code> error.</p>\n   */\n  ExpectedBucketOwner?: string;\n}\n'})}),"\n",(0,i.jsxs)(n.p,{children:["which will return a ",(0,i.jsx)(n.code,{children:"Promise"})," with"]}),"\n",(0,i.jsx)(n.pre,{children:(0,i.jsx)(n.code,{className:"language-typescript",children:"export interface PutBucketAclCommandOutput {\n  /**\n   * Metadata pertaining to this request.\n   */\n  $metadata: ResponseMetadata;\n}\n"})}),"\n",(0,i.jsx)(n.h4,{id:"updating-logging",children:"Updating Logging"}),"\n",(0,i.jsx)(n.pre,{children:(0,i.jsx)(n.code,{className:"language-typescript",children:"const result = await this.bucketService.updateLogging('test', options);\n"})}),"\n",(0,i.jsx)(n.p,{children:"which can receive the following options"}),"\n",(0,i.jsx)(n.pre,{children:(0,i.jsx)(n.code,{className:"language-typescript",children:"export interface PutBucketLoggingCommandInput {\n  /**\n   * <p>Container for logging status information.</p>\n   */\n  BucketLoggingStatus: BucketLoggingStatus | undefined;\n  /**\n   * <p>The MD5 hash of the <code>PutBucketLogging</code> request body.</p>\n   *          <p>For requests made using the Amazon Web Services Command Line Interface (CLI) or Amazon Web Services SDKs, this field is calculated automatically.</p>\n   */\n  ContentMD5?: string;\n  /**\n   * <p>The account ID of the expected bucket owner. If the bucket is owned by a different account, the request will fail with an HTTP <code>403 (Access Denied)</code> error.</p>\n   */\n  ExpectedBucketOwner?: string;\n}\n"})}),"\n",(0,i.jsxs)(n.p,{children:["which will return a ",(0,i.jsx)(n.code,{children:"Promise"})," with"]}),"\n",(0,i.jsx)(n.pre,{children:(0,i.jsx)(n.code,{className:"language-typescript",children:"export interface PutBucketLoggingCommandOutput {\n  /**\n   * Metadata pertaining to this request.\n   */\n  $metadata: ResponseMetadata;\n}\n"})}),"\n",(0,i.jsx)(n.h4,{id:"updating-encryption",children:"Updating encryption"}),"\n",(0,i.jsx)(n.pre,{children:(0,i.jsx)(n.code,{className:"language-typescript",children:"const result = await this.bucketService.updateEncryption('test', options);\n"})}),"\n",(0,i.jsx)(n.p,{children:"which can receive the following options"}),"\n",(0,i.jsx)(n.pre,{children:(0,i.jsx)(n.code,{className:"language-typescript",children:"export interface PutBucketEncryptionCommandInput {\n  /**\n   * <p>The base64-encoded 128-bit MD5 digest of the server-side encryption configuration.</p>\n   *          <p>For requests made using the Amazon Web Services Command Line Interface (CLI) or Amazon Web Services SDKs, this field is calculated automatically.</p>\n   */\n  ContentMD5?: string;\n  /**\n   * <p>Specifies the default server-side-encryption configuration.</p>\n   */\n  ServerSideEncryptionConfiguration: ServerSideEncryptionConfiguration | undefined;\n  /**\n   * <p>The account ID of the expected bucket owner. If the bucket is owned by a different account, the request will fail with an HTTP <code>403 (Access Denied)</code> error.</p>\n   */\n  ExpectedBucketOwner?: string;\n}\n"})}),"\n",(0,i.jsxs)(n.p,{children:["which will return a ",(0,i.jsx)(n.code,{children:"Promise"})," with"]}),"\n",(0,i.jsx)(n.pre,{children:(0,i.jsx)(n.code,{className:"language-typescript",children:"export interface PutBucketEncryptionCommandOutput {\n  /**\n   * Metadata pertaining to this request.\n   */\n  $metadata: ResponseMetadata;\n}\n"})}),"\n",(0,i.jsx)(n.h4,{id:"updating-accelerate-configuration",children:"Updating accelerate configuration"}),"\n",(0,i.jsx)(n.pre,{children:(0,i.jsx)(n.code,{className:"language-typescript",children:"const result = await this.bucketService.updateAccelerateConfiguration('test', options);\n"})}),"\n",(0,i.jsx)(n.p,{children:"which can receive the following options"}),"\n",(0,i.jsx)(n.pre,{children:(0,i.jsx)(n.code,{className:"language-typescript",children:"export interface AccelerateConfiguration {\n  /**\n   * <p>Specifies the transfer acceleration status of the bucket.</p>\n   */\n  Status?: BucketAccelerateStatus | string;\n}\n"})}),"\n",(0,i.jsxs)(n.p,{children:["which will return a ",(0,i.jsx)(n.code,{children:"Promise"})," with"]}),"\n",(0,i.jsx)(n.pre,{children:(0,i.jsx)(n.code,{className:"language-typescript",children:"export interface PutBucketAccelerateConfigurationCommandOutput {\n  /**\n   * Metadata pertaining to this request.\n   */\n  $metadata: ResponseMetadata;\n}\n"})})]})}function u(e={}){const{wrapper:n}={...(0,s.R)(),...e.components};return n?(0,i.jsx)(n,{...e,children:(0,i.jsx)(d,{...e})}):d(e)}},8453:(e,n,t)=>{t.d(n,{R:()=>a,x:()=>r});var i=t(6540);const s={},c=i.createContext(s);function a(e){const n=i.useContext(c);return i.useMemo((function(){return"function"==typeof e?e(n):{...n,...e}}),[n,e])}function r(e){let n;return n=e.disableParentContext?"function"==typeof e.components?e.components(s):e.components||s:a(e.components),i.createElement(c.Provider,{value:n},e.children)}}}]);