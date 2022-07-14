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

[services/buckers.service.ts:34](https://github.com/LabO8/nestjs-s3/blob/bdcd0b3/src/services/buckers.service.ts#L34)

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

[services/buckers.service.ts:36](https://github.com/LabO8/nestjs-s3/blob/bdcd0b3/src/services/buckers.service.ts#L36)

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

[services/buckers.service.ts:48](https://github.com/LabO8/nestjs-s3/blob/bdcd0b3/src/services/buckers.service.ts#L48)

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

[services/buckers.service.ts:60](https://github.com/LabO8/nestjs-s3/blob/bdcd0b3/src/services/buckers.service.ts#L60)

___

### list

▸ **list**(): `Promise`<`ListBucketsCommandOutput`\>

#### Returns

`Promise`<`ListBucketsCommandOutput`\>

#### Defined in

[services/buckers.service.ts:56](https://github.com/LabO8/nestjs-s3/blob/bdcd0b3/src/services/buckers.service.ts#L56)

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

[services/buckers.service.ts:66](https://github.com/LabO8/nestjs-s3/blob/bdcd0b3/src/services/buckers.service.ts#L66)

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

[services/buckers.service.ts:119](https://github.com/LabO8/nestjs-s3/blob/bdcd0b3/src/services/buckers.service.ts#L119)

___

### updateAcl

▸ **updateAcl**(`bucket`, `configuration`): `Promise`<`PutBucketAclCommandOutput`\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `bucket` | `string` |
| `configuration` | `Omit`<`PutBucketAclCommandInput`, ``"Bucket"``\> |

#### Returns

`Promise`<`PutBucketAclCommandOutput`\>

#### Defined in

[services/buckers.service.ts:83](https://github.com/LabO8/nestjs-s3/blob/bdcd0b3/src/services/buckers.service.ts#L83)

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

[services/buckers.service.ts:74](https://github.com/LabO8/nestjs-s3/blob/bdcd0b3/src/services/buckers.service.ts#L74)

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

[services/buckers.service.ts:107](https://github.com/LabO8/nestjs-s3/blob/bdcd0b3/src/services/buckers.service.ts#L107)

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

[services/buckers.service.ts:95](https://github.com/LabO8/nestjs-s3/blob/bdcd0b3/src/services/buckers.service.ts#L95)
