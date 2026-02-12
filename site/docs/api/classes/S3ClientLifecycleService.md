# Class: S3ClientLifecycleService

Defined in: [services/s3-client-lifecycle.service.ts:10](https://github.com/LabO8/nestjs-s3/blob/e794c43d7663b323c5c2be5e76cab638ebdaa3b4/src/services/s3-client-lifecycle.service.ts#L10)

Manages S3Client lifecycle by properly destroying it when the module is torn down.
Prevents hanging HTTP connections that would keep tests from exiting cleanly.

## Implements

- `OnModuleDestroy`

## Constructors

### Constructor

> **new S3ClientLifecycleService**(`s3Client`): `S3ClientLifecycleService`

Defined in: [services/s3-client-lifecycle.service.ts:11](https://github.com/LabO8/nestjs-s3/blob/e794c43d7663b323c5c2be5e76cab638ebdaa3b4/src/services/s3-client-lifecycle.service.ts#L11)

#### Parameters

##### s3Client

`S3Client`

#### Returns

`S3ClientLifecycleService`

## Methods

### onModuleDestroy()

> **onModuleDestroy**(): `void`

Defined in: [services/s3-client-lifecycle.service.ts:13](https://github.com/LabO8/nestjs-s3/blob/e794c43d7663b323c5c2be5e76cab638ebdaa3b4/src/services/s3-client-lifecycle.service.ts#L13)

#### Returns

`void`

#### Implementation of

`OnModuleDestroy.onModuleDestroy`
