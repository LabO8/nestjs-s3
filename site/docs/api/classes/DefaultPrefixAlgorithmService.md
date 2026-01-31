# Class: DefaultPrefixAlgorithmService

Defined in: [services/default-prefix-algorithm.service.ts:3](https://github.com/nickchauhan/nestjs-s3/blob/c23807e9a7c2368d5f5240ce0bcf423a36aeffe9/src/services/default-prefix-algorithm.service.ts#L3)

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

Defined in: [services/default-prefix-algorithm.service.ts:4](https://github.com/nickchauhan/nestjs-s3/blob/c23807e9a7c2368d5f5240ce0bcf423a36aeffe9/src/services/default-prefix-algorithm.service.ts#L4)

#### Parameters

##### remote

`string`

##### prefix?

`string`

#### Returns

`string`

#### Implementation of

[`IPrefixAlgorithm`](../interfaces/IPrefixAlgorithm.md).[`prefix`](../interfaces/IPrefixAlgorithm.md#prefix)
