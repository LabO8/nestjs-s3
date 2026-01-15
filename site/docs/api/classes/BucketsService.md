# Class: BucketsService

Defined in: [services/buckets.service.ts:33](https://github.com/LabO8/nestjs-s3/blob/ad059a6199bca96cb3120eb68144ed879ab6c69e/src/services/buckets.service.ts#L33)

## Constructors

### Constructor

> **new BucketsService**(`client`): `BucketsService`

Defined in: [services/buckets.service.ts:34](https://github.com/LabO8/nestjs-s3/blob/ad059a6199bca96cb3120eb68144ed879ab6c69e/src/services/buckets.service.ts#L34)

#### Parameters

##### client

`S3Client`

#### Returns

`BucketsService`

## Methods

### create()

> **create**(`bucket`, `options`): `Promise`\<`CreateBucketCommandOutput`\>

Defined in: [services/buckets.service.ts:36](https://github.com/LabO8/nestjs-s3/blob/ad059a6199bca96cb3120eb68144ed879ab6c69e/src/services/buckets.service.ts#L36)

#### Parameters

##### bucket

`string`

##### options

`Omit`\<`CreateBucketCommandInput`, `"Bucket"`\> = `{}`

#### Returns

`Promise`\<`CreateBucketCommandOutput`\>

***

### delete()

> **delete**(`bucket`): `Promise`\<`DeleteBucketCommandOutput`\>

Defined in: [services/buckets.service.ts:48](https://github.com/LabO8/nestjs-s3/blob/ad059a6199bca96cb3120eb68144ed879ab6c69e/src/services/buckets.service.ts#L48)

#### Parameters

##### bucket

`string`

#### Returns

`Promise`\<`DeleteBucketCommandOutput`\>

***

### find()

> **find**(`bucket`): `Promise`\<`Bucket`\>

Defined in: [services/buckets.service.ts:60](https://github.com/LabO8/nestjs-s3/blob/ad059a6199bca96cb3120eb68144ed879ab6c69e/src/services/buckets.service.ts#L60)

#### Parameters

##### bucket

`string`

#### Returns

`Promise`\<`Bucket`\>

***

### list()

> **list**(): `Promise`\<`ListBucketsCommandOutput`\>

Defined in: [services/buckets.service.ts:56](https://github.com/LabO8/nestjs-s3/blob/ad059a6199bca96cb3120eb68144ed879ab6c69e/src/services/buckets.service.ts#L56)

#### Returns

`Promise`\<`ListBucketsCommandOutput`\>

***

### tagging()

> **tagging**(`bucket`): `Promise`\<`GetBucketTaggingCommandOutput`\>

Defined in: [services/buckets.service.ts:66](https://github.com/LabO8/nestjs-s3/blob/ad059a6199bca96cb3120eb68144ed879ab6c69e/src/services/buckets.service.ts#L66)

#### Parameters

##### bucket

`string`

#### Returns

`Promise`\<`GetBucketTaggingCommandOutput`\>

***

### updateAccelerateConfiguration()

> **updateAccelerateConfiguration**(`bucket`, `configuration`): `Promise`\<`PutBucketAccelerateConfigurationCommandOutput`\>

Defined in: [services/buckets.service.ts:119](https://github.com/LabO8/nestjs-s3/blob/ad059a6199bca96cb3120eb68144ed879ab6c69e/src/services/buckets.service.ts#L119)

#### Parameters

##### bucket

`string`

##### configuration

`AccelerateConfiguration`

#### Returns

`Promise`\<`PutBucketAccelerateConfigurationCommandOutput`\>

***

### updateAcl()

> **updateAcl**(`bucket`, `configuration`): `Promise`\<`PutBucketAclCommandOutput`\>

Defined in: [services/buckets.service.ts:83](https://github.com/LabO8/nestjs-s3/blob/ad059a6199bca96cb3120eb68144ed879ab6c69e/src/services/buckets.service.ts#L83)

#### Parameters

##### bucket

`string`

##### configuration

`Omit`\<`PutBucketAclCommandInput`, `"Bucket"`\>

#### Returns

`Promise`\<`PutBucketAclCommandOutput`\>

***

### updateCors()

> **updateCors**(`bucket`, `configuration`): `Promise`\<`PutBucketCorsCommandOutput`\>

Defined in: [services/buckets.service.ts:74](https://github.com/LabO8/nestjs-s3/blob/ad059a6199bca96cb3120eb68144ed879ab6c69e/src/services/buckets.service.ts#L74)

#### Parameters

##### bucket

`string`

##### configuration

`CORSConfiguration`

#### Returns

`Promise`\<`PutBucketCorsCommandOutput`\>

***

### updateEncryption()

> **updateEncryption**(`bucket`, `configuration`): `Promise`\<`PutBucketEncryptionCommandOutput`\>

Defined in: [services/buckets.service.ts:107](https://github.com/LabO8/nestjs-s3/blob/ad059a6199bca96cb3120eb68144ed879ab6c69e/src/services/buckets.service.ts#L107)

#### Parameters

##### bucket

`string`

##### configuration

`Omit`\<`PutBucketEncryptionCommandInput`, `"Bucket"`\>

#### Returns

`Promise`\<`PutBucketEncryptionCommandOutput`\>

***

### updateLogging()

> **updateLogging**(`bucket`, `configuration`): `Promise`\<`PutBucketLoggingCommandOutput`\>

Defined in: [services/buckets.service.ts:95](https://github.com/LabO8/nestjs-s3/blob/ad059a6199bca96cb3120eb68144ed879ab6c69e/src/services/buckets.service.ts#L95)

#### Parameters

##### bucket

`string`

##### configuration

`Omit`\<`PutBucketLoggingCommandInput`, `"Bucket"`\>

#### Returns

`Promise`\<`PutBucketLoggingCommandOutput`\>
