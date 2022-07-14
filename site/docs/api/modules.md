---
id: "modules"
title: "@lab08/nestjs-s3"
sidebar_label: "Exports"
sidebar_position: 0.5
custom_edit_url: null
---

## Classes

- [BucketsService](classes/BucketsService)
- [DownloadService](classes/DownloadService)
- [ObjectsService](classes/ObjectsService)
- [PrefixService](classes/PrefixService)
- [S3Module](classes/S3Module)
- [SignedUrlService](classes/SignedUrlService)

## Type aliases

### DeleteObjectOptions

Ƭ **DeleteObjectOptions**: `Omit`<`DeleteObjectCommandInput`, ``"Bucket"`` \| ``"Key"``\>

#### Defined in

[types/object-command-options.type.ts:12](https://github.com/LabO8/nestjs-s3/blob/5ca27ba/src/types/object-command-options.type.ts#L12)

___

### DeleteObjectsOptions

Ƭ **DeleteObjectsOptions**: `Omit`<`DeleteObjectsCommandInput`, ``"Bucket"`` \| ``"Delete"``\>

#### Defined in

[types/object-command-options.type.ts:10](https://github.com/LabO8/nestjs-s3/blob/5ca27ba/src/types/object-command-options.type.ts#L10)

___

### DownloadOptions

Ƭ **DownloadOptions**: `Object`

#### Type declaration

| Name | Type |
| :------ | :------ |
| `createPath?` | `boolean` |
| `filename?` | `string` \| ``null`` |
| `mode?` | `number` \| `string` |

#### Defined in

[types/download-options.type.ts:1](https://github.com/LabO8/nestjs-s3/blob/5ca27ba/src/types/download-options.type.ts#L1)

___

### GetObjectOptions

Ƭ **GetObjectOptions**: `Omit`<`GetObjectCommandInput`, ``"Bucket"`` \| ``"Key"``\>

#### Defined in

[types/object-command-options.type.ts:9](https://github.com/LabO8/nestjs-s3/blob/5ca27ba/src/types/object-command-options.type.ts#L9)

___

### ListObjectOptions

Ƭ **ListObjectOptions**: `Omit`<`ListObjectsCommandInput`, ``"Bucket"``\>

#### Defined in

[types/object-command-options.type.ts:13](https://github.com/LabO8/nestjs-s3/blob/5ca27ba/src/types/object-command-options.type.ts#L13)

___

### PutObjectOptions

Ƭ **PutObjectOptions**: `Omit`<`PutObjectCommandInput`, ``"Bucket"`` \| ``"Body"`` \| ``"Key"``\>

#### Defined in

[types/object-command-options.type.ts:11](https://github.com/LabO8/nestjs-s3/blob/5ca27ba/src/types/object-command-options.type.ts#L11)

___

### PutSignedUrl

Ƭ **PutSignedUrl**: `Object`

#### Type declaration

| Name | Type |
| :------ | :------ |
| `remote` | `string` |
| `url` | `string` |

#### Defined in

[types/signed-url.type.ts:1](https://github.com/LabO8/nestjs-s3/blob/5ca27ba/src/types/signed-url.type.ts#L1)

___

### S3AsyncConfig

Ƭ **S3AsyncConfig**: `Pick`<`ModuleMetadata`, ``"imports"`` \| ``"providers"``\> & { `inject?`: (`Type`<`unknown`\> \| `string` \| `symbol` \| `Abstract`<`unknown`\>)[] ; `useFactory`: (...`args`: `any`[]) => [`S3Config`](modules#s3config) \| `Promise`<[`S3Config`](modules#s3config)\>  }

#### Defined in

[types/s3-config.type.ts:12](https://github.com/LabO8/nestjs-s3/blob/5ca27ba/src/types/s3-config.type.ts#L12)

___

### S3Config

Ƭ **S3Config**: `Object`

#### Type declaration

| Name | Type |
| :------ | :------ |
| `accessKeyId` | `string` |
| `endPoint?` | `string` |
| `prefix?` | `string` |
| `region` | `string` |
| `secretAccessKey` | `string` |

#### Defined in

[types/s3-config.type.ts:4](https://github.com/LabO8/nestjs-s3/blob/5ca27ba/src/types/s3-config.type.ts#L4)

## Variables

### DEFAULT\_EXPIRES\_IN

• **DEFAULT\_EXPIRES\_IN**: ``3600``

#### Defined in

[constants.ts:4](https://github.com/LabO8/nestjs-s3/blob/5ca27ba/src/constants.ts#L4)

___

### S3\_CONFIG

• **S3\_CONFIG**: ``"s3.config"``

#### Defined in

[constants.ts:1](https://github.com/LabO8/nestjs-s3/blob/5ca27ba/src/constants.ts#L1)

___

### S3\_SERVICE

• **S3\_SERVICE**: ``"s3.service"``

#### Defined in

[constants.ts:2](https://github.com/LabO8/nestjs-s3/blob/5ca27ba/src/constants.ts#L2)

## Functions

### createS3ServiceProvider

▸ `Const` **createS3ServiceProvider**(): `Provider`<`any`\>

#### Returns

`Provider`<`any`\>

#### Defined in

[s3-service.factory.ts:6](https://github.com/LabO8/nestjs-s3/blob/5ca27ba/src/s3-service.factory.ts#L6)
