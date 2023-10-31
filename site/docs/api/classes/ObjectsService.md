---
id: "ObjectsService"
title: "Class: ObjectsService"
sidebar_label: "ObjectsService"
sidebar_position: 0
custom_edit_url: null
---

## Constructors

### constructor

• **new ObjectsService**(`client`, `prefixService`)

#### Parameters

| Name | Type |
| :------ | :------ |
| `client` | `S3Client` |
| `prefixService` | [`PrefixService`](PrefixService) |

#### Defined in

[services/objects.service.ts:32](https://github.com/LabO8/nestjs-s3/blob/65a196f/src/services/objects.service.ts#L32)

## Methods

### deleteObject

▸ **deleteObject**(`bucket`, `remote`, `options?`): `Promise`<`DeleteObjectOutput`\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `bucket` | `string` |
| `remote` | `string` |
| `options?` | [`DeleteObjectOptions`](../modules#deleteobjectoptions) |

#### Returns

`Promise`<`DeleteObjectOutput`\>

#### Defined in

[services/objects.service.ts:66](https://github.com/LabO8/nestjs-s3/blob/65a196f/src/services/objects.service.ts#L66)

___

### deleteObjects

▸ **deleteObjects**(`bucket`, `remotes`, `options?`): `Promise`<`DeleteObjectsOutput`\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `bucket` | `string` |
| `remotes` | `string`[] |
| `options?` | [`DeleteObjectsOptions`](../modules#deleteobjectsoptions) |

#### Returns

`Promise`<`DeleteObjectsOutput`\>

#### Defined in

[services/objects.service.ts:82](https://github.com/LabO8/nestjs-s3/blob/65a196f/src/services/objects.service.ts#L82)

___

### getObject

▸ **getObject**(`bucket`, `remote`, `options?`): `Promise`<`GetObjectOutput`\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `bucket` | `string` |
| `remote` | `string` |
| `options?` | [`GetObjectOptions`](../modules#getobjectoptions) |

#### Returns

`Promise`<`GetObjectOutput`\>

#### Defined in

[services/objects.service.ts:100](https://github.com/LabO8/nestjs-s3/blob/65a196f/src/services/objects.service.ts#L100)

___

### listObjects

▸ **listObjects**(`bucket`, `options?`): `Promise`<`ListObjectsOutput`\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `bucket` | `string` |
| `options?` | [`ListObjectsOptions`](../modules#listobjectsoptions) |

#### Returns

`Promise`<`ListObjectsOutput`\>

#### Defined in

[services/objects.service.ts:112](https://github.com/LabO8/nestjs-s3/blob/65a196f/src/services/objects.service.ts#L112)

___

### listObjectsV2

▸ **listObjectsV2**(`bucket`, `options?`): `Promise`<`ListObjectsV2Output`\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `bucket` | `string` |
| `options?` | [`ListObjectsV2Options`](../modules#listobjectsv2options) |

#### Returns

`Promise`<`ListObjectsV2Output`\>

#### Defined in

[services/objects.service.ts:121](https://github.com/LabO8/nestjs-s3/blob/65a196f/src/services/objects.service.ts#L121)

___

### putObject

▸ **putObject**(`bucket`, `body`, `remote`, `options?`): `Promise`<`PutObjectOutput`\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `bucket` | `string` |
| `body` | `Buffer` |
| `remote` | `string` |
| `options?` | [`PutObjectOptions`](../modules#putobjectoptions) |

#### Returns

`Promise`<`PutObjectOutput`\>

#### Defined in

[services/objects.service.ts:37](https://github.com/LabO8/nestjs-s3/blob/65a196f/src/services/objects.service.ts#L37)

___

### putObjectFromPath

▸ **putObjectFromPath**(`bucket`, `path`, `remote`, `options?`): `Promise`<`PutObjectOutput`\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `bucket` | `string` |
| `path` | `string` |
| `remote` | `string` |
| `options?` | [`PutObjectOptions`](../modules#putobjectoptions) |

#### Returns

`Promise`<`PutObjectOutput`\>

#### Defined in

[services/objects.service.ts:55](https://github.com/LabO8/nestjs-s3/blob/65a196f/src/services/objects.service.ts#L55)
