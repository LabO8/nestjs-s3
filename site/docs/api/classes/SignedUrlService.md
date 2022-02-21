---
id: "SignedUrlService"
title: "Class: SignedUrlService"
sidebar_label: "SignedUrlService"
sidebar_position: 0
custom_edit_url: null
---

## Constructors

### constructor

• **new SignedUrlService**(`client`, `prefixService`)

#### Parameters

| Name | Type |
| :------ | :------ |
| `client` | `S3Client` |
| `prefixService` | [`PrefixService`](PrefixService) |

#### Defined in

[services/signed-url.service.ts:16](https://github.com/LabO8/nestjs-s3/blob/2156324/src/services/signed-url.service.ts#L16)

## Methods

### getDeleteObjectsSignedUrl

▸ **getDeleteObjectsSignedUrl**(`bucket`, `remotes`, `expiresIn?`, `options?`): `Promise`<`string`\>

#### Parameters

| Name | Type | Default value |
| :------ | :------ | :------ |
| `bucket` | `string` | `undefined` |
| `remotes` | `string`[] | `undefined` |
| `expiresIn` | `number` | `DEFAULT_EXPIRES_IN` |
| `options?` | [`DeleteObjectsOptions`](../modules#deleteobjectsoptions) | `undefined` |

#### Returns

`Promise`<`string`\>

#### Defined in

[services/signed-url.service.ts:87](https://github.com/LabO8/nestjs-s3/blob/2156324/src/services/signed-url.service.ts#L87)

___

### getDeleteSignedUrl

▸ **getDeleteSignedUrl**(`bucket`, `remote`, `expiresIn?`, `options?`): `Promise`<`string`\>

#### Parameters

| Name | Type | Default value |
| :------ | :------ | :------ |
| `bucket` | `string` | `undefined` |
| `remote` | `string` | `undefined` |
| `expiresIn` | `number` | `DEFAULT_EXPIRES_IN` |
| `options?` | [`DeleteObjectOptions`](../modules#deleteobjectoptions) | `undefined` |

#### Returns

`Promise`<`string`\>

#### Defined in

[services/signed-url.service.ts:66](https://github.com/LabO8/nestjs-s3/blob/2156324/src/services/signed-url.service.ts#L66)

___

### getPutSignedUrl

▸ **getPutSignedUrl**(`bucket`, `remote`, `expiresIn?`, `options?`): `Promise`<[`PutSignedUrl`](../modules#putsignedurl)\>

#### Parameters

| Name | Type | Default value |
| :------ | :------ | :------ |
| `bucket` | `string` | `undefined` |
| `remote` | `string` | `undefined` |
| `expiresIn` | `number` | `DEFAULT_EXPIRES_IN` |
| `options?` | [`PutObjectOptions`](../modules#putobjectoptions) | `undefined` |

#### Returns

`Promise`<[`PutSignedUrl`](../modules#putsignedurl)\>

#### Defined in

[services/signed-url.service.ts:21](https://github.com/LabO8/nestjs-s3/blob/2156324/src/services/signed-url.service.ts#L21)

___

### getSignedUrl

▸ **getSignedUrl**(`bucket`, `remote`, `expiresIn?`, `options?`): `Promise`<`string`\>

#### Parameters

| Name | Type | Default value |
| :------ | :------ | :------ |
| `bucket` | `string` | `undefined` |
| `remote` | `string` | `undefined` |
| `expiresIn` | `number` | `DEFAULT_EXPIRES_IN` |
| `options?` | [`GetObjectOptions`](../modules#getobjectoptions) | `undefined` |

#### Returns

`Promise`<`string`\>

#### Defined in

[services/signed-url.service.ts:45](https://github.com/LabO8/nestjs-s3/blob/2156324/src/services/signed-url.service.ts#L45)
