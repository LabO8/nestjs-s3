# Type Alias: S3AsyncConfig

> **S3AsyncConfig**: `Pick`\<`ModuleMetadata`, `"imports"` \| `"providers"`\> & `object`

## Type declaration

### inject?

> `optional` **inject**: (`Type`\<`unknown`\> \| `string` \| `symbol` \| `Abstract`\<`unknown`\>)[]

### prefixAlgorithmFactory()?

> `optional` **prefixAlgorithmFactory**: (...`args`) => `Promise`\<[`IPrefixAlgorithm`](../interfaces/IPrefixAlgorithm.md)\> \| [`IPrefixAlgorithm`](../interfaces/IPrefixAlgorithm.md)

#### Parameters

• ...**args**: `any`[]

#### Returns

`Promise`\<[`IPrefixAlgorithm`](../interfaces/IPrefixAlgorithm.md)\> \| [`IPrefixAlgorithm`](../interfaces/IPrefixAlgorithm.md)

### prefixAlgorithmInject?

> `optional` **prefixAlgorithmInject**: (`Type`\<`unknown`\> \| `string` \| `symbol` \| `Abstract`\<`unknown`\>)[]

### useFactory()

> **useFactory**: (...`args`) => `Promise`\<`Omit`\<[`S3Config`](S3Config.md), `"prefixAlgorithm"`\>\> \| `Omit`\<[`S3Config`](S3Config.md), `"prefixAlgorithm"`\>

#### Parameters

• ...**args**: `any`[]

#### Returns

`Promise`\<`Omit`\<[`S3Config`](S3Config.md), `"prefixAlgorithm"`\>\> \| `Omit`\<[`S3Config`](S3Config.md), `"prefixAlgorithm"`\>

## Defined in

[types/s3-config.type.ts:14](https://github.com/LabO8/nestjs-s3/blob/306023e15fcb498533a66fc2f9b000dc61a2bf64/src/types/s3-config.type.ts#L14)
