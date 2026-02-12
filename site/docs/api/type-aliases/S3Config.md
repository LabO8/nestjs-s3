# Type Alias: S3Config

> **S3Config** = `object`

Defined in: [types/s3-config.type.ts:6](https://github.com/LabO8/nestjs-s3/blob/e794c43d7663b323c5c2be5e76cab638ebdaa3b4/src/types/s3-config.type.ts#L6)

## Properties

### accessKeyId

> **accessKeyId**: `string`

Defined in: [types/s3-config.type.ts:8](https://github.com/LabO8/nestjs-s3/blob/e794c43d7663b323c5c2be5e76cab638ebdaa3b4/src/types/s3-config.type.ts#L8)

***

### endPoint?

> `optional` **endPoint**: `string`

Defined in: [types/s3-config.type.ts:11](https://github.com/LabO8/nestjs-s3/blob/e794c43d7663b323c5c2be5e76cab638ebdaa3b4/src/types/s3-config.type.ts#L11)

***

### multipartUpload?

> `optional` **multipartUpload**: `object`

Defined in: [types/s3-config.type.ts:14](https://github.com/LabO8/nestjs-s3/blob/e794c43d7663b323c5c2be5e76cab638ebdaa3b4/src/types/s3-config.type.ts#L14)

#### defaultPartSize?

> `optional` **defaultPartSize**: `number`

Default part size for multipart uploads in bytes
Must be at least 5MB (5 * 1024 * 1024)

##### Default

```ts
5242880 (5MB)
```

***

### prefix?

> `optional` **prefix**: `string`

Defined in: [types/s3-config.type.ts:10](https://github.com/LabO8/nestjs-s3/blob/e794c43d7663b323c5c2be5e76cab638ebdaa3b4/src/types/s3-config.type.ts#L10)

***

### prefixAlgorithm?

> `optional` **prefixAlgorithm**: [`IPrefixAlgorithm`](../interfaces/IPrefixAlgorithm.md)

Defined in: [types/s3-config.type.ts:12](https://github.com/LabO8/nestjs-s3/blob/e794c43d7663b323c5c2be5e76cab638ebdaa3b4/src/types/s3-config.type.ts#L12)

***

### region

> **region**: `string`

Defined in: [types/s3-config.type.ts:7](https://github.com/LabO8/nestjs-s3/blob/e794c43d7663b323c5c2be5e76cab638ebdaa3b4/src/types/s3-config.type.ts#L7)

***

### s3ClientConfig?

> `optional` **s3ClientConfig**: `Partial`\<`S3ClientConfig`\>

Defined in: [types/s3-config.type.ts:13](https://github.com/LabO8/nestjs-s3/blob/e794c43d7663b323c5c2be5e76cab638ebdaa3b4/src/types/s3-config.type.ts#L13)

***

### secretAccessKey

> **secretAccessKey**: `string`

Defined in: [types/s3-config.type.ts:9](https://github.com/LabO8/nestjs-s3/blob/e794c43d7663b323c5c2be5e76cab638ebdaa3b4/src/types/s3-config.type.ts#L9)
