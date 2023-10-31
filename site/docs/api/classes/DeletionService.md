---
id: "DeletionService"
title: "Class: DeletionService"
sidebar_label: "DeletionService"
sidebar_position: 0
custom_edit_url: null
---

## Constructors

### constructor

• **new DeletionService**(`client`, `objectsService`, `prefixService`)

#### Parameters

| Name | Type |
| :------ | :------ |
| `client` | `S3Client` |
| `objectsService` | [`ObjectsService`](ObjectsService) |
| `prefixService` | [`PrefixService`](PrefixService) |

#### Defined in

utils/deletion.service.ts:10

## Methods

### deleteObjectsByPrefix

▸ **deleteObjectsByPrefix**(`bucket`, `prefix`, `logDeletedObjects?`, `deleteOptions?`, `listOptions?`): `Promise`<`boolean` \| `DeleteObjectOutput`[]\>

Deletes all objects by prefix.

#### Parameters

| Name | Type | Default value |
| :------ | :------ | :------ |
| `bucket` | `string` | `undefined` |
| `prefix` | `string` | `undefined` |
| `logDeletedObjects` | `boolean` | `false` |
| `deleteOptions?` | [`DeleteObjectsOptions`](../modules#deleteobjectsoptions) | `undefined` |
| `listOptions?` | `Omit`<[`ListObjectsV2Options`](../modules#listobjectsv2options), ``"Prefix"`` \| ``"ContinuationToken"``\> | `undefined` |

#### Returns

`Promise`<`boolean` \| `DeleteObjectOutput`[]\>

Returns true if all objects were deleted.

#### Defined in

utils/deletion.service.ts:20
