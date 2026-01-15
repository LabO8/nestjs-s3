# Class: DeletionService

Defined in: [utils/deletion.service.ts:9](https://github.com/LabO8/nestjs-s3/blob/ad059a6199bca96cb3120eb68144ed879ab6c69e/src/utils/deletion.service.ts#L9)

## Constructors

### Constructor

> **new DeletionService**(`client`, `objectsService`, `prefixService`): `DeletionService`

Defined in: [utils/deletion.service.ts:10](https://github.com/LabO8/nestjs-s3/blob/ad059a6199bca96cb3120eb68144ed879ab6c69e/src/utils/deletion.service.ts#L10)

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

Defined in: [utils/deletion.service.ts:20](https://github.com/LabO8/nestjs-s3/blob/ad059a6199bca96cb3120eb68144ed879ab6c69e/src/utils/deletion.service.ts#L20)

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
