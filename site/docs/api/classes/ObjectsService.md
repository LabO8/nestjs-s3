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

[services/objects.service.ts:28](https://github.com/LabO8/nestjs-s3/blob/bdcd0b3/src/services/objects.service.ts#L28)

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

[services/objects.service.ts:60](https://github.com/LabO8/nestjs-s3/blob/bdcd0b3/src/services/objects.service.ts#L60)

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

[services/objects.service.ts:74](https://github.com/LabO8/nestjs-s3/blob/bdcd0b3/src/services/objects.service.ts#L74)

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

[services/objects.service.ts:90](https://github.com/LabO8/nestjs-s3/blob/bdcd0b3/src/services/objects.service.ts#L90)

___

### listObjects

▸ **listObjects**(`bucket`, `options?`): `Promise`<`ListObjectsOutput`\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `bucket` | `string` |
| `options?` | [`ListObjectOptions`](../modules#listobjectoptions) |

#### Returns

`Promise`<`ListObjectsOutput`\>

#### Defined in

[services/objects.service.ts:100](https://github.com/LabO8/nestjs-s3/blob/bdcd0b3/src/services/objects.service.ts#L100)

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

[services/objects.service.ts:33](https://github.com/LabO8/nestjs-s3/blob/bdcd0b3/src/services/objects.service.ts#L33)

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

[services/objects.service.ts:49](https://github.com/LabO8/nestjs-s3/blob/bdcd0b3/src/services/objects.service.ts#L49)
