# Class: DeletionService

Defined in: [utils/deletion.service.ts:9](https://github.com/nickchauhan/nestjs-s3/blob/c23807e9a7c2368d5f5240ce0bcf423a36aeffe9/src/utils/deletion.service.ts#L9)

## Constructors

### Constructor

> **new DeletionService**(`client`, `objectsService`, `prefixService`): `DeletionService`

Defined in: [utils/deletion.service.ts:10](https://github.com/nickchauhan/nestjs-s3/blob/c23807e9a7c2368d5f5240ce0bcf423a36aeffe9/src/utils/deletion.service.ts#L10)

#### Parameters

##### client

`S3Client`

##### objectsService

[`ObjectsService`](ObjectsService.md)

##### prefixService

[`PrefixService`](PrefixService.md)

#### Returns

`DeletionService`

## Methods

### deleteObjectsByPrefix()

> **deleteObjectsByPrefix**(`bucket`, `prefix`, `logDeletedObjects`, `deleteOptions?`, `listOptions?`): `Promise`\<`boolean` \| `DeleteObjectOutput`[]\>

Defined in: [utils/deletion.service.ts:20](https://github.com/nickchauhan/nestjs-s3/blob/c23807e9a7c2368d5f5240ce0bcf423a36aeffe9/src/utils/deletion.service.ts#L20)

Deletes all objects by prefix.

#### Parameters

##### bucket

`string`

##### prefix

`string`

##### logDeletedObjects

`boolean` = `false`

##### deleteOptions?

[`DeleteObjectsOptions`](../type-aliases/DeleteObjectsOptions.md)

##### listOptions?

`Omit`\<[`ListObjectsV2Options`](../type-aliases/ListObjectsV2Options.md), `"Prefix"` \| `"ContinuationToken"`\>

#### Returns

`Promise`\<`boolean` \| `DeleteObjectOutput`[]\>

Returns true if all objects were deleted.
