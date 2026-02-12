# Class: MultipartUploadService

Defined in: [services/multipart-upload.service.ts:27](https://github.com/LabO8/nestjs-s3/blob/e794c43d7663b323c5c2be5e76cab638ebdaa3b4/src/services/multipart-upload.service.ts#L27)

## Constructors

### Constructor

> **new MultipartUploadService**(`client`, `options`, `prefixService`): `MultipartUploadService`

Defined in: [services/multipart-upload.service.ts:37](https://github.com/LabO8/nestjs-s3/blob/e794c43d7663b323c5c2be5e76cab638ebdaa3b4/src/services/multipart-upload.service.ts#L37)

#### Parameters

##### client

`S3Client`

##### options

[`S3Config`](../type-aliases/S3Config.md)

##### prefixService

[`PrefixService`](PrefixService.md)

#### Returns

`MultipartUploadService`

## Methods

### abortMultipartUpload()

> **abortMultipartUpload**(`bucket`, `key`, `uploadId`): `Promise`\<[`MultipartUploadAbortion`](../type-aliases/MultipartUploadAbortion.md)\>

Defined in: [services/multipart-upload.service.ts:151](https://github.com/LabO8/nestjs-s3/blob/e794c43d7663b323c5c2be5e76cab638ebdaa3b4/src/services/multipart-upload.service.ts#L151)

Abort a multipart upload and clean up uploaded parts.

#### Parameters

##### bucket

`string`

S3 bucket name

##### key

`string`

Object key (use the prefixed key from initiateMultipartUpload)

##### uploadId

`string`

Upload ID from initiateMultipartUpload

#### Returns

`Promise`\<[`MultipartUploadAbortion`](../type-aliases/MultipartUploadAbortion.md)\>

***

### calculatePartSize()

> **calculatePartSize**(`fileSize`, `preferredPartSize?`): [`PartSizeCalculation`](../type-aliases/PartSizeCalculation.md)

Defined in: [services/multipart-upload.service.ts:231](https://github.com/LabO8/nestjs-s3/blob/e794c43d7663b323c5c2be5e76cab638ebdaa3b4/src/services/multipart-upload.service.ts#L231)

Calculate optimal part size for a given file size.

Priority order for part size determination:
1. preferredPartSize parameter (highest priority)
2. Module configuration defaultPartSize
3. AWS minimum 5MB (fallback)

Automatically adjusts part size to stay within AWS's 10,000 part limit.

#### Parameters

##### fileSize

`number`

Total file size in bytes (must be > 0)

##### preferredPartSize?

`number`

Optional preferred part size in bytes (must be >= 5MB)

#### Returns

[`PartSizeCalculation`](../type-aliases/PartSizeCalculation.md)

Object containing calculated partSize and totalParts

#### Throws

BadRequestException if fileSize less than 0 or preferredPartSize less than 5MB

#### Examples

```ts
// Use module default (or AWS minimum if not configured)
calculatePartSize(100 * 1024 * 1024);
```

```ts
// Override with 50MB parts for better performance
calculatePartSize(100 * 1024 * 1024, 50 * 1024 * 1024);
```

***

### completeMultipartUpload()

> **completeMultipartUpload**(`bucket`, `key`, `uploadId`, `parts`): `Promise`\<[`MultipartUploadCompletion`](../type-aliases/MultipartUploadCompletion.md)\>

Defined in: [services/multipart-upload.service.ts:114](https://github.com/LabO8/nestjs-s3/blob/e794c43d7663b323c5c2be5e76cab638ebdaa3b4/src/services/multipart-upload.service.ts#L114)

Complete a multipart upload.

#### Parameters

##### bucket

`string`

S3 bucket name

##### key

`string`

Object key (use the prefixed key from initiateMultipartUpload)

##### uploadId

`string`

Upload ID from initiateMultipartUpload

##### parts

`Required`\<`Pick`\<`Part`, `"ETag"` \| `"PartNumber"`\>\>[]

Array of uploaded parts with ETags and part numbers (must be sorted)

#### Returns

`Promise`\<[`MultipartUploadCompletion`](../type-aliases/MultipartUploadCompletion.md)\>

***

### getUploadPartPresignedUrl()

> **getUploadPartPresignedUrl**(`bucket`, `key`, `uploadId`, `partNumber`, `expiresIn`): `Promise`\<[`PresignedUploadUrl`](../type-aliases/PresignedUploadUrl.md)\>

Defined in: [services/multipart-upload.service.ts:83](https://github.com/LabO8/nestjs-s3/blob/e794c43d7663b323c5c2be5e76cab638ebdaa3b4/src/services/multipart-upload.service.ts#L83)

Generate a presigned URL for uploading a part.

#### Parameters

##### bucket

`string`

S3 bucket name

##### key

`string`

Object key (use the prefixed key from initiateMultipartUpload)

##### uploadId

`string`

Upload ID from initiateMultipartUpload

##### partNumber

`number`

Part number (1-10000)

##### expiresIn

`number` = `DEFAULT_EXPIRES_IN`

URL expiration time in seconds

#### Returns

`Promise`\<[`PresignedUploadUrl`](../type-aliases/PresignedUploadUrl.md)\>

***

### initiateMultipartUpload()

> **initiateMultipartUpload**(`bucket`, `key`, `options?`): `Promise`\<[`MultipartUploadInitiation`](../type-aliases/MultipartUploadInitiation.md)\>

Defined in: [services/multipart-upload.service.ts:45](https://github.com/LabO8/nestjs-s3/blob/e794c43d7663b323c5c2be5e76cab638ebdaa3b4/src/services/multipart-upload.service.ts#L45)

#### Parameters

##### bucket

`string`

##### key

`string`

##### options?

[`MultipartUploadOptions`](../type-aliases/MultipartUploadOptions.md)

#### Returns

`Promise`\<[`MultipartUploadInitiation`](../type-aliases/MultipartUploadInitiation.md)\>

***

### listParts()

> **listParts**(`bucket`, `key`, `uploadId`, `maxParts?`, `partNumberMarker?`): `Promise`\<[`ListPartsResult`](../type-aliases/ListPartsResult.md)\>

Defined in: [services/multipart-upload.service.ts:174](https://github.com/LabO8/nestjs-s3/blob/e794c43d7663b323c5c2be5e76cab638ebdaa3b4/src/services/multipart-upload.service.ts#L174)

List uploaded parts of a multipart upload.

#### Parameters

##### bucket

`string`

S3 bucket name

##### key

`string`

Object key (use the prefixed key from initiateMultipartUpload)

##### uploadId

`string`

Upload ID from initiateMultipartUpload

##### maxParts?

`number`

Maximum number of parts to return

##### partNumberMarker?

`number`

Part number to start listing from

#### Returns

`Promise`\<[`ListPartsResult`](../type-aliases/ListPartsResult.md)\>
