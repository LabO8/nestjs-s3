# Class: DeletionService

## Constructors

### new DeletionService()

> **new DeletionService**(`client`, `objectsService`, `prefixService`): [`DeletionService`](DeletionService.md)

#### Parameters

• **client**: `S3Client`

• **objectsService**: [`ObjectsService`](ObjectsService.md)

• **prefixService**: [`PrefixService`](PrefixService.md)

#### Returns

[`DeletionService`](DeletionService.md)

#### Defined in

[utils/deletion.service.ts:10](https://github.com/LabO8/nestjs-s3/blob/49dee046307be2343007f81b5481193f2a950f4b/src/utils/deletion.service.ts#L10)

## Methods

### deleteObjectsByPrefix()

> **deleteObjectsByPrefix**(`bucket`, `prefix`, `logDeletedObjects`, `deleteOptions`?, `listOptions`?): `Promise`\<`boolean` \| `DeleteObjectOutput`[]\>

Deletes all objects by prefix.

#### Parameters

• **bucket**: `string`

• **prefix**: `string`

• **logDeletedObjects**: `boolean` = `false`

• **deleteOptions?**: [`DeleteObjectsOptions`](../type-aliases/DeleteObjectsOptions.md)

• **listOptions?**: `Omit`\<[`ListObjectsV2Options`](../type-aliases/ListObjectsV2Options.md), `"Prefix"` \| `"ContinuationToken"`\>

#### Returns

`Promise`\<`boolean` \| `DeleteObjectOutput`[]\>

Returns true if all objects were deleted.

#### Defined in

[utils/deletion.service.ts:20](https://github.com/LabO8/nestjs-s3/blob/49dee046307be2343007f81b5481193f2a950f4b/src/utils/deletion.service.ts#L20)
