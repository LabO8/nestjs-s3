# Class: DefaultPrefixAlgorithmService

Defined in: [services/default-prefix-algorithm.service.ts:3](https://github.com/LabO8/nestjs-s3/blob/e794c43d7663b323c5c2be5e76cab638ebdaa3b4/src/services/default-prefix-algorithm.service.ts#L3)

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

Defined in: [services/default-prefix-algorithm.service.ts:4](https://github.com/LabO8/nestjs-s3/blob/e794c43d7663b323c5c2be5e76cab638ebdaa3b4/src/services/default-prefix-algorithm.service.ts#L4)

#### Parameters

##### remote

`string`

##### prefix?

`string`

#### Returns

`string`

#### Implementation of

[`IPrefixAlgorithm`](../interfaces/IPrefixAlgorithm.md).[`prefix`](../interfaces/IPrefixAlgorithm.md#prefix)
