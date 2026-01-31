# Type Alias: S3AsyncConfig

> **S3AsyncConfig** = `Pick`\<`ModuleMetadata`, `"imports"` \| `"providers"`\> & `object`

Defined in: [types/s3-config.type.ts:24](https://github.com/nickchauhan/nestjs-s3/blob/c23807e9a7c2368d5f5240ce0bcf423a36aeffe9/src/types/s3-config.type.ts#L24)

## Type Declaration

### inject?

> `optional` **inject**: (`Type`\<`unknown`\> \| `string` \| `symbol` \| `Abstract`\<`unknown`\>)[]

### prefixAlgorithmFactory()?

> `optional` **prefixAlgorithmFactory**: (...`args`) => `Promise`\<[`IPrefixAlgorithm`](../interfaces/IPrefixAlgorithm.md)\> \| [`IPrefixAlgorithm`](../interfaces/IPrefixAlgorithm.md)

#### Parameters

##### args

...`any`[]

#### Returns

`Promise`\<[`IPrefixAlgorithm`](../interfaces/IPrefixAlgorithm.md)\> \| [`IPrefixAlgorithm`](../interfaces/IPrefixAlgorithm.md)

### prefixAlgorithmInject?

> `optional` **prefixAlgorithmInject**: (`Type`\<`unknown`\> \| `string` \| `symbol` \| `Abstract`\<`unknown`\>)[]

### useFactory()

> **useFactory**: (...`args`) => `Promise`\<`Omit`\<[`S3Config`](S3Config.md), `"prefixAlgorithm"`\>\> \| `Omit`\<[`S3Config`](S3Config.md), `"prefixAlgorithm"`\>

#### Parameters

##### args

...`any`[]

#### Returns

`Promise`\<`Omit`\<[`S3Config`](S3Config.md), `"prefixAlgorithm"`\>\> \| `Omit`\<[`S3Config`](S3Config.md), `"prefixAlgorithm"`\>
