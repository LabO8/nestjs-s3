# Class: ObjectsService

Defined in: [services/objects.service.ts:36](https://github.com/LabO8/nestjs-s3/blob/e794c43d7663b323c5c2be5e76cab638ebdaa3b4/src/services/objects.service.ts#L36)

## Constructors

### Constructor

> **new ObjectsService**(`client`, `prefixService`): `ObjectsService`

Defined in: [services/objects.service.ts:37](https://github.com/LabO8/nestjs-s3/blob/e794c43d7663b323c5c2be5e76cab638ebdaa3b4/src/services/objects.service.ts#L37)

#### Parameters

##### client

`S3Client`

##### prefixService

[`PrefixService`](PrefixService.md)

#### Returns

`ObjectsService`

## Methods

### copyObject()

> **copyObject**(`sourceBucket`, `sourceKey`, `destinationBucket`, `destinationKey`, `options?`): `Promise`\<`CopyObjectOutput`\>

Defined in: [services/objects.service.ts:119](https://github.com/LabO8/nestjs-s3/blob/e794c43d7663b323c5c2be5e76cab638ebdaa3b4/src/services/objects.service.ts#L119)

#### Parameters

##### sourceBucket

`string`

##### sourceKey

`string`

##### destinationBucket

`string`

##### destinationKey

`string`

##### options?

###### destinationOptions?

[`CopyObjectOptions`](../type-aliases/CopyObjectOptions.md)

###### sourceOptions?

[`DisableAutoPrefix`](../type-aliases/DisableAutoPrefix.md) & [`PrefixContext`](../type-aliases/PrefixContext.md)

#### Returns

`Promise`\<`CopyObjectOutput`\>

***

### deleteObject()

> **deleteObject**(`bucket`, `remote`, `options?`): `Promise`\<`DeleteObjectOutput`\>

Defined in: [services/objects.service.ts:71](https://github.com/LabO8/nestjs-s3/blob/e794c43d7663b323c5c2be5e76cab638ebdaa3b4/src/services/objects.service.ts#L71)

#### Parameters

##### bucket

`string`

##### remote

`string`

##### options?

[`DeleteObjectOptions`](../type-aliases/DeleteObjectOptions.md)

#### Returns

`Promise`\<`DeleteObjectOutput`\>

***

### deleteObjects()

> **deleteObjects**(`bucket`, `remotes`, `options?`): `Promise`\<`DeleteObjectsOutput`\>

Defined in: [services/objects.service.ts:87](https://github.com/LabO8/nestjs-s3/blob/e794c43d7663b323c5c2be5e76cab638ebdaa3b4/src/services/objects.service.ts#L87)

#### Parameters

##### bucket

`string`

##### remotes

`string`[]

##### options?

[`DeleteObjectsOptions`](../type-aliases/DeleteObjectsOptions.md)

#### Returns

`Promise`\<`DeleteObjectsOutput`\>

***

### getObject()

> **getObject**(`bucket`, `remote`, `options?`): `Promise`\<`GetObjectOutput`\>

Defined in: [services/objects.service.ts:107](https://github.com/LabO8/nestjs-s3/blob/e794c43d7663b323c5c2be5e76cab638ebdaa3b4/src/services/objects.service.ts#L107)

#### Parameters

##### bucket

`string`

##### remote

`string`

##### options?

[`GetObjectOptions`](../type-aliases/GetObjectOptions.md)

#### Returns

`Promise`\<`GetObjectOutput`\>

***

### listObjects()

> **listObjects**(`bucket`, `options?`): `Promise`\<`ListObjectsOutput`\>

Defined in: [services/objects.service.ts:156](https://github.com/LabO8/nestjs-s3/blob/e794c43d7663b323c5c2be5e76cab638ebdaa3b4/src/services/objects.service.ts#L156)

#### Parameters

##### bucket

`string`

##### options?

[`ListObjectsOptions`](../type-aliases/ListObjectsOptions.md)

#### Returns

`Promise`\<`ListObjectsOutput`\>

***

### listObjectsV2()

> **listObjectsV2**(`bucket`, `options?`): `Promise`\<`ListObjectsV2Output`\>

Defined in: [services/objects.service.ts:165](https://github.com/LabO8/nestjs-s3/blob/e794c43d7663b323c5c2be5e76cab638ebdaa3b4/src/services/objects.service.ts#L165)

#### Parameters

##### bucket

`string`

##### options?

[`ListObjectsV2Options`](../type-aliases/ListObjectsV2Options.md)

#### Returns

`Promise`\<`ListObjectsV2Output`\>

***

### putObject()

> **putObject**(`bucket`, `body`, `remote`, `options?`): `Promise`\<`PutObjectOutput`\>

Defined in: [services/objects.service.ts:42](https://github.com/LabO8/nestjs-s3/blob/e794c43d7663b323c5c2be5e76cab638ebdaa3b4/src/services/objects.service.ts#L42)

#### Parameters

##### bucket

`string`

##### body

`Buffer`

##### remote

`string`

##### options?

[`PutObjectOptions`](../type-aliases/PutObjectOptions.md)

#### Returns

`Promise`\<`PutObjectOutput`\>

***

### putObjectFromPath()

> **putObjectFromPath**(`bucket`, `path`, `remote`, `options?`): `Promise`\<`PutObjectOutput`\>

Defined in: [services/objects.service.ts:60](https://github.com/LabO8/nestjs-s3/blob/e794c43d7663b323c5c2be5e76cab638ebdaa3b4/src/services/objects.service.ts#L60)

#### Parameters

##### bucket

`string`

##### path

`string`

##### remote

`string`

##### options?

[`PutObjectOptions`](../type-aliases/PutObjectOptions.md)

#### Returns

`Promise`\<`PutObjectOutput`\>
