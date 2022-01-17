---
id: "BucketsService"
title: "Class: BucketsService"
sidebar_label: "BucketsService"
sidebar_position: 0
custom_edit_url: null
---

## Constructors

### constructor

• **new BucketsService**(`client`)

#### Parameters

| Name | Type |
| :------ | :------ |
| `client` | `S3Client` |

#### Defined in

[services/buckers.service.ts:33](https://github.com/LabO8/nestjs-s3/blob/91ee2ce/src/services/buckers.service.ts#L33)

## Methods

### create

▸ **create**(`bucket`, `options?`): `Promise`<`CreateBucketCommandOutput`\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `bucket` | `string` |
| `options` | `Omit`<`CreateBucketCommandInput`, ``"Bucket"``\> |

#### Returns

`Promise`<`CreateBucketCommandOutput`\>

#### Defined in

[services/buckers.service.ts:35](https://github.com/LabO8/nestjs-s3/blob/91ee2ce/src/services/buckers.service.ts#L35)

___

### delete

▸ **delete**(`bucket`): `Promise`<`DeleteBucketCommandOutput`\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `bucket` | `string` |

#### Returns

`Promise`<`DeleteBucketCommandOutput`\>

#### Defined in

[services/buckers.service.ts:47](https://github.com/LabO8/nestjs-s3/blob/91ee2ce/src/services/buckers.service.ts#L47)

___

### find

▸ **find**(`bucket`): `Promise`<`Bucket`\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `bucket` | `string` |

#### Returns

`Promise`<`Bucket`\>

#### Defined in

[services/buckers.service.ts:59](https://github.com/LabO8/nestjs-s3/blob/91ee2ce/src/services/buckers.service.ts#L59)

___

### list

▸ **list**(): `Promise`<`ListBucketsCommandOutput`\>

#### Returns

`Promise`<`ListBucketsCommandOutput`\>

#### Defined in

[services/buckers.service.ts:55](https://github.com/LabO8/nestjs-s3/blob/91ee2ce/src/services/buckers.service.ts#L55)

___

### tagging

▸ **tagging**(`bucket`): `Promise`<`GetBucketTaggingCommandOutput`\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `bucket` | `string` |

#### Returns

`Promise`<`GetBucketTaggingCommandOutput`\>

#### Defined in

[services/buckers.service.ts:65](https://github.com/LabO8/nestjs-s3/blob/91ee2ce/src/services/buckers.service.ts#L65)

___

### updateAccelerateConfiguration

▸ **updateAccelerateConfiguration**(`bucket`, `configuration`): `Promise`<`PutBucketAccelerateConfigurationCommandOutput`\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `bucket` | `string` |
| `configuration` | `AccelerateConfiguration` |

#### Returns

`Promise`<`PutBucketAccelerateConfigurationCommandOutput`\>

#### Defined in

[services/buckers.service.ts:118](https://github.com/LabO8/nestjs-s3/blob/91ee2ce/src/services/buckers.service.ts#L118)

___

### updateAcl

▸ **updateAcl**(`bucket`, `configuration`): `Promise`<`PutBucketCorsCommandOutput`\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `bucket` | `string` |
| `configuration` | `Omit`<`PutBucketAclCommandInput`, ``"Bucket"``\> |

#### Returns

`Promise`<`PutBucketCorsCommandOutput`\>

#### Defined in

[services/buckers.service.ts:82](https://github.com/LabO8/nestjs-s3/blob/91ee2ce/src/services/buckers.service.ts#L82)

___

### updateCors

▸ **updateCors**(`bucket`, `configuration`): `Promise`<`PutBucketCorsCommandOutput`\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `bucket` | `string` |
| `configuration` | `CORSConfiguration` |

#### Returns

`Promise`<`PutBucketCorsCommandOutput`\>

#### Defined in

[services/buckers.service.ts:73](https://github.com/LabO8/nestjs-s3/blob/91ee2ce/src/services/buckers.service.ts#L73)

___

### updateEncryption

▸ **updateEncryption**(`bucket`, `configuration`): `Promise`<`PutBucketEncryptionCommandOutput`\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `bucket` | `string` |
| `configuration` | `Omit`<`PutBucketEncryptionCommandInput`, ``"Bucket"``\> |

#### Returns

`Promise`<`PutBucketEncryptionCommandOutput`\>

#### Defined in

[services/buckers.service.ts:106](https://github.com/LabO8/nestjs-s3/blob/91ee2ce/src/services/buckers.service.ts#L106)

___

### updateLogging

▸ **updateLogging**(`bucket`, `configuration`): `Promise`<`PutBucketLoggingCommandOutput`\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `bucket` | `string` |
| `configuration` | `Omit`<`PutBucketLoggingCommandInput`, ``"Bucket"``\> |

#### Returns

`Promise`<`PutBucketLoggingCommandOutput`\>

#### Defined in

[services/buckers.service.ts:94](https://github.com/LabO8/nestjs-s3/blob/91ee2ce/src/services/buckers.service.ts#L94)
