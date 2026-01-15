# Class: PrefixService

Defined in: [services/prefix.service.ts:7](https://github.com/LabO8/nestjs-s3/blob/ad059a6199bca96cb3120eb68144ed879ab6c69e/src/services/prefix.service.ts#L7)

## Constructors

### Constructor

> **new PrefixService**(`config`, `prefixAlgorithm`): `PrefixService`

Defined in: [services/prefix.service.ts:8](https://github.com/LabO8/nestjs-s3/blob/ad059a6199bca96cb3120eb68144ed879ab6c69e/src/services/prefix.service.ts#L8)

#### Parameters

##### config

[`S3Config`](../type-aliases/S3Config.md)

##### prefixAlgorithm

[`IPrefixAlgorithm`](../interfaces/IPrefixAlgorithm.md)

#### Returns

`PrefixService`

## Methods

### prefix()

> **prefix**(`remote`, `bucket?`, `context?`): `string`

Defined in: [services/prefix.service.ts:13](https://github.com/LabO8/nestjs-s3/blob/ad059a6199bca96cb3120eb68144ed879ab6c69e/src/services/prefix.service.ts#L13)

#### Parameters

##### remote

`string`

##### bucket?

`string`

##### context?

`any`

#### Returns

`string`
