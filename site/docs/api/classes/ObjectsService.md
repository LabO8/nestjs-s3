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

[services/objects.service.ts:20](https://github.com/LabO8/nestjs-s3/blob/b27b70b/src/services/objects.service.ts#L20)

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

[services/objects.service.ts:52](https://github.com/LabO8/nestjs-s3/blob/b27b70b/src/services/objects.service.ts#L52)

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

[services/objects.service.ts:66](https://github.com/LabO8/nestjs-s3/blob/b27b70b/src/services/objects.service.ts#L66)

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

[services/objects.service.ts:82](https://github.com/LabO8/nestjs-s3/blob/b27b70b/src/services/objects.service.ts#L82)

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

[services/objects.service.ts:25](https://github.com/LabO8/nestjs-s3/blob/b27b70b/src/services/objects.service.ts#L25)

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

[services/objects.service.ts:41](https://github.com/LabO8/nestjs-s3/blob/b27b70b/src/services/objects.service.ts#L41)
