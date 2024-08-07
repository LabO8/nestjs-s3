# Class: BucketsService

## Constructors

### new BucketsService()

> **new BucketsService**(`client`): [`BucketsService`](BucketsService.md)

#### Parameters

• **client**: `S3Client`

#### Returns

[`BucketsService`](BucketsService.md)

#### Defined in

[services/buckets.service.ts:34](https://github.com/LabO8/nestjs-s3/blob/1543c2d00f94450144b62a41101481b695225e3d/src/services/buckets.service.ts#L34)

## Methods

### create()

> **create**(`bucket`, `options`): `Promise`\<`CreateBucketCommandOutput`\>

#### Parameters

• **bucket**: `string`

• **options**: `Omit`\<`CreateBucketCommandInput`, `"Bucket"`\> = `{}`

#### Returns

`Promise`\<`CreateBucketCommandOutput`\>

#### Defined in

[services/buckets.service.ts:36](https://github.com/LabO8/nestjs-s3/blob/1543c2d00f94450144b62a41101481b695225e3d/src/services/buckets.service.ts#L36)

***

### delete()

> **delete**(`bucket`): `Promise`\<`DeleteBucketCommandOutput`\>

#### Parameters

• **bucket**: `string`

#### Returns

`Promise`\<`DeleteBucketCommandOutput`\>

#### Defined in

[services/buckets.service.ts:48](https://github.com/LabO8/nestjs-s3/blob/1543c2d00f94450144b62a41101481b695225e3d/src/services/buckets.service.ts#L48)

***

### find()

> **find**(`bucket`): `Promise`\<`Bucket`\>

#### Parameters

• **bucket**: `string`

#### Returns

`Promise`\<`Bucket`\>

#### Defined in

[services/buckets.service.ts:60](https://github.com/LabO8/nestjs-s3/blob/1543c2d00f94450144b62a41101481b695225e3d/src/services/buckets.service.ts#L60)

***

### list()

> **list**(): `Promise`\<`ListBucketsCommandOutput`\>

#### Returns

`Promise`\<`ListBucketsCommandOutput`\>

#### Defined in

[services/buckets.service.ts:56](https://github.com/LabO8/nestjs-s3/blob/1543c2d00f94450144b62a41101481b695225e3d/src/services/buckets.service.ts#L56)

***

### tagging()

> **tagging**(`bucket`): `Promise`\<`GetBucketTaggingCommandOutput`\>

#### Parameters

• **bucket**: `string`

#### Returns

`Promise`\<`GetBucketTaggingCommandOutput`\>

#### Defined in

[services/buckets.service.ts:66](https://github.com/LabO8/nestjs-s3/blob/1543c2d00f94450144b62a41101481b695225e3d/src/services/buckets.service.ts#L66)

***

### updateAccelerateConfiguration()

> **updateAccelerateConfiguration**(`bucket`, `configuration`): `Promise`\<`PutBucketAccelerateConfigurationCommandOutput`\>

#### Parameters

• **bucket**: `string`

• **configuration**: `AccelerateConfiguration`

#### Returns

`Promise`\<`PutBucketAccelerateConfigurationCommandOutput`\>

#### Defined in

[services/buckets.service.ts:119](https://github.com/LabO8/nestjs-s3/blob/1543c2d00f94450144b62a41101481b695225e3d/src/services/buckets.service.ts#L119)

***

### updateAcl()

> **updateAcl**(`bucket`, `configuration`): `Promise`\<`PutBucketAclCommandOutput`\>

#### Parameters

• **bucket**: `string`

• **configuration**: `Omit`\<`PutBucketAclCommandInput`, `"Bucket"`\>

#### Returns

`Promise`\<`PutBucketAclCommandOutput`\>

#### Defined in

[services/buckets.service.ts:83](https://github.com/LabO8/nestjs-s3/blob/1543c2d00f94450144b62a41101481b695225e3d/src/services/buckets.service.ts#L83)

***

### updateCors()

> **updateCors**(`bucket`, `configuration`): `Promise`\<`PutBucketCorsCommandOutput`\>

#### Parameters

• **bucket**: `string`

• **configuration**: `CORSConfiguration`

#### Returns

`Promise`\<`PutBucketCorsCommandOutput`\>

#### Defined in

[services/buckets.service.ts:74](https://github.com/LabO8/nestjs-s3/blob/1543c2d00f94450144b62a41101481b695225e3d/src/services/buckets.service.ts#L74)

***

### updateEncryption()

> **updateEncryption**(`bucket`, `configuration`): `Promise`\<`PutBucketEncryptionCommandOutput`\>

#### Parameters

• **bucket**: `string`

• **configuration**: `Omit`\<`PutBucketEncryptionCommandInput`, `"Bucket"`\>

#### Returns

`Promise`\<`PutBucketEncryptionCommandOutput`\>

#### Defined in

[services/buckets.service.ts:107](https://github.com/LabO8/nestjs-s3/blob/1543c2d00f94450144b62a41101481b695225e3d/src/services/buckets.service.ts#L107)

***

### updateLogging()

> **updateLogging**(`bucket`, `configuration`): `Promise`\<`PutBucketLoggingCommandOutput`\>

#### Parameters

• **bucket**: `string`

• **configuration**: `Omit`\<`PutBucketLoggingCommandInput`, `"Bucket"`\>

#### Returns

`Promise`\<`PutBucketLoggingCommandOutput`\>

#### Defined in

[services/buckets.service.ts:95](https://github.com/LabO8/nestjs-s3/blob/1543c2d00f94450144b62a41101481b695225e3d/src/services/buckets.service.ts#L95)
