# Class: SignedUrlService

Defined in: [services/signed-url.service.ts:16](https://github.com/LabO8/nestjs-s3/blob/ad059a6199bca96cb3120eb68144ed879ab6c69e/src/services/signed-url.service.ts#L16)

## Constructors

### Constructor

> **new SignedUrlService**(`client`, `prefixService`): `SignedUrlService`

Defined in: [services/signed-url.service.ts:17](https://github.com/LabO8/nestjs-s3/blob/ad059a6199bca96cb3120eb68144ed879ab6c69e/src/services/signed-url.service.ts#L17)

#### Parameters

##### client

`S3Client`

##### prefixService

[`PrefixService`](PrefixService.md)

#### Returns

`SignedUrlService`

## Methods

### getDeleteObjectsSignedUrl()

> **getDeleteObjectsSignedUrl**(`bucket`, `remotes`, `expiresIn`, `options?`): `Promise`\<`string`\>

Defined in: [services/signed-url.service.ts:85](https://github.com/LabO8/nestjs-s3/blob/ad059a6199bca96cb3120eb68144ed879ab6c69e/src/services/signed-url.service.ts#L85)

#### Parameters

##### bucket

`string`

##### remotes

`string`[]

##### expiresIn

`number` = `DEFAULT_EXPIRES_IN`

##### options?

[`DeleteObjectsOptions`](../type-aliases/DeleteObjectsOptions.md)

#### Returns

`Promise`\<`string`\>

***

### getDeleteSignedUrl()

> **getDeleteSignedUrl**(`bucket`, `remote`, `expiresIn`, `options?`): `Promise`\<`string`\>

Defined in: [services/signed-url.service.ts:66](https://github.com/LabO8/nestjs-s3/blob/ad059a6199bca96cb3120eb68144ed879ab6c69e/src/services/signed-url.service.ts#L66)

#### Parameters

##### bucket

`string`

##### remote

`string`

##### expiresIn

`number` = `DEFAULT_EXPIRES_IN`

##### options?

[`DeleteObjectOptions`](../type-aliases/DeleteObjectOptions.md)

#### Returns

`Promise`\<`string`\>

***

### getPutSignedUrl()

> **getPutSignedUrl**(`bucket`, `remote`, `expiresIn`, `options?`): `Promise`\<[`PutSignedUrl`](../type-aliases/PutSignedUrl.md)\>

Defined in: [services/signed-url.service.ts:22](https://github.com/LabO8/nestjs-s3/blob/ad059a6199bca96cb3120eb68144ed879ab6c69e/src/services/signed-url.service.ts#L22)

#### Parameters

##### bucket

`string`

##### remote

`string`

##### expiresIn

`number` = `DEFAULT_EXPIRES_IN`

##### options?

[`PutObjectOptions`](../type-aliases/PutObjectOptions.md)

#### Returns

`Promise`\<[`PutSignedUrl`](../type-aliases/PutSignedUrl.md)\>

***

### getSignedUrl()

> **getSignedUrl**(`bucket`, `remote`, `expiresIn`, `options?`): `Promise`\<`string`\>

Defined in: [services/signed-url.service.ts:47](https://github.com/LabO8/nestjs-s3/blob/ad059a6199bca96cb3120eb68144ed879ab6c69e/src/services/signed-url.service.ts#L47)

#### Parameters

##### bucket

`string`

##### remote

`string`

##### expiresIn

`number` = `DEFAULT_EXPIRES_IN`

##### options?

[`GetObjectOptions`](../type-aliases/GetObjectOptions.md)

#### Returns

`Promise`\<`string`\>
