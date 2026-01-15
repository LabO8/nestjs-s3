# Class: DefaultPrefixAlgorithmService

Defined in: [services/default-prefix-algorithm.service.ts:3](https://github.com/LabO8/nestjs-s3/blob/ad059a6199bca96cb3120eb68144ed879ab6c69e/src/services/default-prefix-algorithm.service.ts#L3)

## Implements

- [`IPrefixAlgorithm`](../interfaces/IPrefixAlgorithm.md)

## Constructors

### Constructor

> **new DefaultPrefixAlgorithmService**(): `DefaultPrefixAlgorithmService`

#### Returns

`DefaultPrefixAlgorithmService`

## Methods

### prefix()

> **prefix**(`remote`, `prefix?`): `string`

Defined in: [services/default-prefix-algorithm.service.ts:4](https://github.com/LabO8/nestjs-s3/blob/ad059a6199bca96cb3120eb68144ed879ab6c69e/src/services/default-prefix-algorithm.service.ts#L4)

#### Parameters

##### remote

`string`

##### prefix?

`string`

#### Returns

`string`

#### Implementation of

[`IPrefixAlgorithm`](../interfaces/IPrefixAlgorithm.md).[`prefix`](../interfaces/IPrefixAlgorithm.md#prefix)
