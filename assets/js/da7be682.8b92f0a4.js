"use strict";(self.webpackChunksite=self.webpackChunksite||[]).push([[455],{3905:function(e,n,t){t.d(n,{Zo:function(){return l},kt:function(){return h}});var o=t(7294);function r(e,n,t){return n in e?Object.defineProperty(e,n,{value:t,enumerable:!0,configurable:!0,writable:!0}):e[n]=t,e}function i(e,n){var t=Object.keys(e);if(Object.getOwnPropertySymbols){var o=Object.getOwnPropertySymbols(e);n&&(o=o.filter((function(n){return Object.getOwnPropertyDescriptor(e,n).enumerable}))),t.push.apply(t,o)}return t}function a(e){for(var n=1;n<arguments.length;n++){var t=null!=arguments[n]?arguments[n]:{};n%2?i(Object(t),!0).forEach((function(n){r(e,n,t[n])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(t)):i(Object(t)).forEach((function(n){Object.defineProperty(e,n,Object.getOwnPropertyDescriptor(t,n))}))}return e}function s(e,n){if(null==e)return{};var t,o,r=function(e,n){if(null==e)return{};var t,o,r={},i=Object.keys(e);for(o=0;o<i.length;o++)t=i[o],n.indexOf(t)>=0||(r[t]=e[t]);return r}(e,n);if(Object.getOwnPropertySymbols){var i=Object.getOwnPropertySymbols(e);for(o=0;o<i.length;o++)t=i[o],n.indexOf(t)>=0||Object.prototype.propertyIsEnumerable.call(e,t)&&(r[t]=e[t])}return r}var c=o.createContext({}),p=function(e){var n=o.useContext(c),t=n;return e&&(t="function"==typeof e?e(n):a(a({},n),e)),t},l=function(e){var n=p(e.components);return o.createElement(c.Provider,{value:n},e.children)},d={inlineCode:"code",wrapper:function(e){var n=e.children;return o.createElement(o.Fragment,{},n)}},u=o.forwardRef((function(e,n){var t=e.components,r=e.mdxType,i=e.originalType,c=e.parentName,l=s(e,["components","mdxType","originalType","parentName"]),u=p(t),h=r,f=u["".concat(c,".").concat(h)]||u[h]||d[h]||i;return t?o.createElement(f,a(a({ref:n},l),{},{components:t})):o.createElement(f,a({ref:n},l))}));function h(e,n){var t=arguments,r=n&&n.mdxType;if("string"==typeof e||r){var i=t.length,a=new Array(i);a[0]=u;var s={};for(var c in n)hasOwnProperty.call(n,c)&&(s[c]=n[c]);s.originalType=e,s.mdxType="string"==typeof e?e:r,a[1]=s;for(var p=2;p<i;p++)a[p]=t[p];return o.createElement.apply(null,a)}return o.createElement.apply(null,t)}u.displayName="MDXCreateElement"},3446:function(e,n,t){t.r(n),t.d(n,{contentTitle:function(){return c},default:function(){return u},frontMatter:function(){return s},metadata:function(){return p},toc:function(){return l}});var o=t(7462),r=t(3366),i=(t(7294),t(3905)),a=["components"],s={id:"download-helper",title:"Download helper",sidebar_label:"Download helper",slug:"/download-helper"},c=void 0,p={unversionedId:"download-helper",id:"download-helper",title:"Download helper",description:"Introduction",source:"@site/docs/download-helper.md",sourceDirName:".",slug:"/download-helper",permalink:"/nestjs-s3/download-helper",editUrl:"https://github.com/LabO8/nestjs-s3/docs/download-helper.md",tags:[],version:"current",frontMatter:{id:"download-helper",title:"Download helper",sidebar_label:"Download helper",slug:"/download-helper"},sidebar:"docsSidebar",previous:{title:"Signed URL service",permalink:"/nestjs-s3/signed-url-service"},next:{title:"Deletion helper",permalink:"/nestjs-s3/deletion-helper"}},l=[{value:"Introduction",id:"introduction",children:[],level:2}],d={toc:l};function u(e){var n=e.components,t=(0,r.Z)(e,a);return(0,i.kt)("wrapper",(0,o.Z)({},d,t,{components:n,mdxType:"MDXLayout"}),(0,i.kt)("h2",{id:"introduction"},"Introduction"),(0,i.kt)("p",null,"Sometimes, we have to do day-to-day tasks like downloading objects and storing them locally. This leads to a lot of boilerplate code, for managing the directories, writing to files, etc."),(0,i.kt)("p",null,"In order to do that we can use the download helper."),(0,i.kt)("pre",null,(0,i.kt)("code",{parentName:"pre",className:"language-typescript"},"import { Injectable } from '@nestjs/common';\nimport { DownloadService } from '@lab08/nestjs-s3';\n\n@Injectable()\nexport class MyService {\n  public constructor(private readonly downloadService: DownloadService) {}\n}\n")),(0,i.kt)("p",null,"What the download service does is help us do these day-to-day tasks easily and without a lot of code."),(0,i.kt)("p",null,"In order to download an object, we can simply"),(0,i.kt)("pre",null,(0,i.kt)("code",{parentName:"pre",className:"language-typescript"},"const localPath = this.downloadService.download(bucket, remote, downloadDirectory, downloadOptions, options);\n")),(0,i.kt)("p",null,"we can pass the following download options:"),(0,i.kt)("pre",null,(0,i.kt)("code",{parentName:"pre",className:"language-typescript"},"export type DownloadOptions = {\n  mode?: number | string;\n  createPath?: boolean;\n  filename?: string | null;\n};\n")),(0,i.kt)("p",null,"Defaults are"),(0,i.kt)("pre",null,(0,i.kt)("code",{parentName:"pre",className:"language-typescript"},"const defaults: DownloadOptions = {\n  mode: 0o755,\n  createPath: true,\n  filename: null,\n};\n")),(0,i.kt)("p",null,"and we can pass options for the request made to S3"),(0,i.kt)("pre",null,(0,i.kt)("code",{parentName:"pre",className:"language-typescript"},'type GetObjectOptions {\n/**\n     * <p>Return the object only if its entity tag (ETag) is the same as the one specified,\n     *          otherwise return a 412 (precondition failed).</p>\n     */\n    IfMatch?: string;\n    /**\n     * <p>Return the object only if it has been modified since the specified time, otherwise\n     *          return a 304 (not modified).</p>\n     */\n    IfModifiedSince?: Date;\n    /**\n     * <p>Return the object only if its entity tag (ETag) is different from the one specified,\n     *          otherwise return a 304 (not modified).</p>\n     */\n    IfNoneMatch?: string;\n    /**\n     * <p>Return the object only if it has not been modified since the specified time, otherwise\n     *          return a 412 (precondition failed).</p>\n     */\n    IfUnmodifiedSince?: Date;\n    /**\n     * <p>Downloads the specified range bytes of an object. For more information about the HTTP\n     *          Range header, see <a href="https://www.w3.org/Protocols/rfc2616/rfc2616-sec14.html#sec14.35">https://www.w3.org/Protocols/rfc2616/rfc2616-sec14.html#sec14.35</a>.</p>\n     *          <note>\n     *             <p>Amazon S3 doesn\'t support retrieving multiple ranges of data per <code>GET</code>\n     *             request.</p>\n     *          </note>\n     */\n    Range?: string;\n    /**\n     * <p>Sets the <code>Cache-Control</code> header of the response.</p>\n     */\n    ResponseCacheControl?: string;\n    /**\n     * <p>Sets the <code>Content-Disposition</code> header of the response</p>\n     */\n    ResponseContentDisposition?: string;\n    /**\n     * <p>Sets the <code>Content-Encoding</code> header of the response.</p>\n     */\n    ResponseContentEncoding?: string;\n    /**\n     * <p>Sets the <code>Content-Language</code> header of the response.</p>\n     */\n    ResponseContentLanguage?: string;\n    /**\n     * <p>Sets the <code>Content-Type</code> header of the response.</p>\n     */\n    ResponseContentType?: string;\n    /**\n     * <p>Sets the <code>Expires</code> header of the response.</p>\n     */\n    ResponseExpires?: Date;\n    /**\n     * <p>VersionId used to reference a specific version of the object.</p>\n     */\n    VersionId?: string;\n    /**\n     * <p>Specifies the algorithm to use when decrypting the object (for example,\n     *          AES256).</p>\n     */\n    SSECustomerAlgorithm?: string;\n    /**\n     * <p>Specifies the customer-provided encryption key for Amazon S3 to encrypt the data. This\n     *          value is used to decrypt the object when recovering it and must match the one used when\n     *          storing the data. The key must be appropriate for use with the algorithm specified in the\n     *             <code>x-amz-server-side-encryption-customer-algorithm</code> header.</p>\n     */\n    SSECustomerKey?: string;\n    /**\n     * <p>Specifies the 128-bit MD5 digest of the encryption key according to RFC 1321. Amazon S3 uses\n     *          this header for message integrity check to ensure that the encryption key was transmitted\n     *          without error.</p>\n     */\n    SSECustomerKeyMD5?: string;\n    /**\n     * <p>Confirms that the requester knows they will be charged for the request. Bucket\n     *          owners need not specify this parameter in their requests. For information about downloading\n     *          objects from requester pays buckets, see <a href="https://docs.aws.amazon.com/AmazonS3/latest/dev/ObjectsinRequesterPaysBuckets.html">Downloading Objects in\n     *             Requestor Pays Buckets</a> in the <i>Amazon S3 User Guide</i>.</p>\n     */\n    RequestPayer?: RequestPayer | string;\n    /**\n     * <p>Part number of the object being read. This is a positive integer between 1 and 10,000.\n     *          Effectively performs a \'ranged\' GET request for the part specified. Useful for downloading\n     *          just a part of an object.</p>\n     */\n    PartNumber?: number;\n    /**\n     * <p>The account ID of the expected bucket owner. If the bucket is owned by a different account, the request will fail with an HTTP <code>403 (Access Denied)</code> error.</p>\n     */\n    ExpectedBucketOwner?: string;\n}\n')),(0,i.kt)("p",null,"This method will return a ",(0,i.kt)("inlineCode",{parentName:"p"},"Promise")," containing the local absolute path."))}u.isMDXComponent=!0}}]);