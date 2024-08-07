# Class: PrefixService

## Constructors

### new PrefixService()

> **new PrefixService**(`config`, `prefixAlgorithm`): [`PrefixService`](PrefixService.md)

#### Parameters

• **config**: [`S3Config`](../type-aliases/S3Config.md)

• **prefixAlgorithm**: [`IPrefixAlgorithm`](../interfaces/IPrefixAlgorithm.md)

#### Returns

[`PrefixService`](PrefixService.md)

#### Defined in

[services/prefix.service.ts:8](https://github.com/LabO8/nestjs-s3/blob/49dee046307be2343007f81b5481193f2a950f4b/src/services/prefix.service.ts#L8)

## Methods

### prefix()

> **prefix**(`remote`, `bucket`?, `context`?): `string`

#### Parameters

• **remote**: `string`

• **bucket?**: `string`

• **context?**: `any`

#### Returns

`string`

#### Defined in

[services/prefix.service.ts:13](https://github.com/LabO8/nestjs-s3/blob/49dee046307be2343007f81b5481193f2a950f4b/src/services/prefix.service.ts#L13)
