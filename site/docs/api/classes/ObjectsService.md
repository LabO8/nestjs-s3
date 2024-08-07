# Class: ObjectsService

## Constructors

### new ObjectsService()

> **new ObjectsService**(`client`, `prefixService`): [`ObjectsService`](ObjectsService.md)

#### Parameters

• **client**: `S3Client`

• **prefixService**: [`PrefixService`](PrefixService.md)

#### Returns

[`ObjectsService`](ObjectsService.md)

#### Defined in

[services/objects.service.ts:37](https://github.com/LabO8/nestjs-s3/blob/1543c2d00f94450144b62a41101481b695225e3d/src/services/objects.service.ts#L37)

## Methods

### copyObject()

> **copyObject**(`sourceBucket`, `sourceKey`, `destinationBucket`, `destinationKey`, `options`?): `Promise`\<`CopyObjectOutput`\>

#### Parameters

• **sourceBucket**: `string`

• **sourceKey**: `string`

• **destinationBucket**: `string`

• **destinationKey**: `string`

• **options?**

• **options.destinationOptions?**: [`CopyObjectOptions`](../type-aliases/CopyObjectOptions.md)

• **options.sourceOptions?**: [`DisableAutoPrefix`](../type-aliases/DisableAutoPrefix.md) & [`PrefixContext`](../type-aliases/PrefixContext.md)

#### Returns

`Promise`\<`CopyObjectOutput`\>

#### Defined in

[services/objects.service.ts:119](https://github.com/LabO8/nestjs-s3/blob/1543c2d00f94450144b62a41101481b695225e3d/src/services/objects.service.ts#L119)

***

### deleteObject()

> **deleteObject**(`bucket`, `remote`, `options`?): `Promise`\<`DeleteObjectOutput`\>

#### Parameters

• **bucket**: `string`

• **remote**: `string`

• **options?**: [`DeleteObjectOptions`](../type-aliases/DeleteObjectOptions.md)

#### Returns

`Promise`\<`DeleteObjectOutput`\>

#### Defined in

[services/objects.service.ts:71](https://github.com/LabO8/nestjs-s3/blob/1543c2d00f94450144b62a41101481b695225e3d/src/services/objects.service.ts#L71)

***

### deleteObjects()

> **deleteObjects**(`bucket`, `remotes`, `options`?): `Promise`\<`DeleteObjectsOutput`\>

#### Parameters

• **bucket**: `string`

• **remotes**: `string`[]

• **options?**: [`DeleteObjectsOptions`](../type-aliases/DeleteObjectsOptions.md)

#### Returns

`Promise`\<`DeleteObjectsOutput`\>

#### Defined in

[services/objects.service.ts:87](https://github.com/LabO8/nestjs-s3/blob/1543c2d00f94450144b62a41101481b695225e3d/src/services/objects.service.ts#L87)

***

### getObject()

> **getObject**(`bucket`, `remote`, `options`?): `Promise`\<`GetObjectOutput`\>

#### Parameters

• **bucket**: `string`

• **remote**: `string`

• **options?**: [`GetObjectOptions`](../type-aliases/GetObjectOptions.md)

#### Returns

`Promise`\<`GetObjectOutput`\>

#### Defined in

[services/objects.service.ts:107](https://github.com/LabO8/nestjs-s3/blob/1543c2d00f94450144b62a41101481b695225e3d/src/services/objects.service.ts#L107)

***

### listObjects()

> **listObjects**(`bucket`, `options`?): `Promise`\<`ListObjectsOutput`\>

#### Parameters

• **bucket**: `string`

• **options?**: [`ListObjectsOptions`](../type-aliases/ListObjectsOptions.md)

#### Returns

`Promise`\<`ListObjectsOutput`\>

#### Defined in

[services/objects.service.ts:156](https://github.com/LabO8/nestjs-s3/blob/1543c2d00f94450144b62a41101481b695225e3d/src/services/objects.service.ts#L156)

***

### listObjectsV2()

> **listObjectsV2**(`bucket`, `options`?): `Promise`\<`ListObjectsV2Output`\>

#### Parameters

• **bucket**: `string`

• **options?**: [`ListObjectsV2Options`](../type-aliases/ListObjectsV2Options.md)

#### Returns

`Promise`\<`ListObjectsV2Output`\>

#### Defined in

[services/objects.service.ts:165](https://github.com/LabO8/nestjs-s3/blob/1543c2d00f94450144b62a41101481b695225e3d/src/services/objects.service.ts#L165)

***

### putObject()

> **putObject**(`bucket`, `body`, `remote`, `options`?): `Promise`\<`PutObjectOutput`\>

#### Parameters

• **bucket**: `string`

• **body**: `Buffer`

• **remote**: `string`

• **options?**: [`PutObjectOptions`](../type-aliases/PutObjectOptions.md)

#### Returns

`Promise`\<`PutObjectOutput`\>

#### Defined in

[services/objects.service.ts:42](https://github.com/LabO8/nestjs-s3/blob/1543c2d00f94450144b62a41101481b695225e3d/src/services/objects.service.ts#L42)

***

### putObjectFromPath()

> **putObjectFromPath**(`bucket`, `path`, `remote`, `options`?): `Promise`\<`PutObjectOutput`\>

#### Parameters

• **bucket**: `string`

• **path**: `string`

• **remote**: `string`

• **options?**: [`PutObjectOptions`](../type-aliases/PutObjectOptions.md)

#### Returns

`Promise`\<`PutObjectOutput`\>

#### Defined in

[services/objects.service.ts:60](https://github.com/LabO8/nestjs-s3/blob/1543c2d00f94450144b62a41101481b695225e3d/src/services/objects.service.ts#L60)
