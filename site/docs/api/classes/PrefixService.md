# Class: PrefixService

Defined in: [services/prefix.service.ts:7](https://github.com/nickchauhan/nestjs-s3/blob/c23807e9a7c2368d5f5240ce0bcf423a36aeffe9/src/services/prefix.service.ts#L7)

## Constructors

### Constructor

> **new PrefixService**(`config`, `prefixAlgorithm`): `PrefixService`

Defined in: [services/prefix.service.ts:8](https://github.com/nickchauhan/nestjs-s3/blob/c23807e9a7c2368d5f5240ce0bcf423a36aeffe9/src/services/prefix.service.ts#L8)

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

Defined in: [services/prefix.service.ts:13](https://github.com/nickchauhan/nestjs-s3/blob/c23807e9a7c2368d5f5240ce0bcf423a36aeffe9/src/services/prefix.service.ts#L13)

#### Parameters

##### remote

`string`

##### bucket?

`string`

##### context?

`any`

#### Returns

`string`
