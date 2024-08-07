# Class: SignedUrlService

## Constructors

### new SignedUrlService()

> **new SignedUrlService**(`client`, `prefixService`): [`SignedUrlService`](SignedUrlService.md)

#### Parameters

• **client**: `S3Client`

• **prefixService**: [`PrefixService`](PrefixService.md)

#### Returns

[`SignedUrlService`](SignedUrlService.md)

#### Defined in

[services/signed-url.service.ts:17](https://github.com/LabO8/nestjs-s3/blob/1543c2d00f94450144b62a41101481b695225e3d/src/services/signed-url.service.ts#L17)

## Methods

### getDeleteObjectsSignedUrl()

> **getDeleteObjectsSignedUrl**(`bucket`, `remotes`, `expiresIn`, `options`?): `Promise`\<`string`\>

#### Parameters

• **bucket**: `string`

• **remotes**: `string`[]

• **expiresIn**: `number` = `DEFAULT_EXPIRES_IN`

• **options?**: [`DeleteObjectsOptions`](../type-aliases/DeleteObjectsOptions.md)

#### Returns

`Promise`\<`string`\>

#### Defined in

[services/signed-url.service.ts:85](https://github.com/LabO8/nestjs-s3/blob/1543c2d00f94450144b62a41101481b695225e3d/src/services/signed-url.service.ts#L85)

***

### getDeleteSignedUrl()

> **getDeleteSignedUrl**(`bucket`, `remote`, `expiresIn`, `options`?): `Promise`\<`string`\>

#### Parameters

• **bucket**: `string`

• **remote**: `string`

• **expiresIn**: `number` = `DEFAULT_EXPIRES_IN`

• **options?**: [`DeleteObjectOptions`](../type-aliases/DeleteObjectOptions.md)

#### Returns

`Promise`\<`string`\>

#### Defined in

[services/signed-url.service.ts:66](https://github.com/LabO8/nestjs-s3/blob/1543c2d00f94450144b62a41101481b695225e3d/src/services/signed-url.service.ts#L66)

***

### getPutSignedUrl()

> **getPutSignedUrl**(`bucket`, `remote`, `expiresIn`, `options`?): `Promise`\<[`PutSignedUrl`](../type-aliases/PutSignedUrl.md)\>

#### Parameters

• **bucket**: `string`

• **remote**: `string`

• **expiresIn**: `number` = `DEFAULT_EXPIRES_IN`

• **options?**: [`PutObjectOptions`](../type-aliases/PutObjectOptions.md)

#### Returns

`Promise`\<[`PutSignedUrl`](../type-aliases/PutSignedUrl.md)\>

#### Defined in

[services/signed-url.service.ts:22](https://github.com/LabO8/nestjs-s3/blob/1543c2d00f94450144b62a41101481b695225e3d/src/services/signed-url.service.ts#L22)

***

### getSignedUrl()

> **getSignedUrl**(`bucket`, `remote`, `expiresIn`, `options`?): `Promise`\<`string`\>

#### Parameters

• **bucket**: `string`

• **remote**: `string`

• **expiresIn**: `number` = `DEFAULT_EXPIRES_IN`

• **options?**: [`GetObjectOptions`](../type-aliases/GetObjectOptions.md)

#### Returns

`Promise`\<`string`\>

#### Defined in

[services/signed-url.service.ts:47](https://github.com/LabO8/nestjs-s3/blob/1543c2d00f94450144b62a41101481b695225e3d/src/services/signed-url.service.ts#L47)
