---
id: getting-started
title: Getting started with NestJS S3 module
sidebar_label: Getting Started
slug: /
---

# Getting started with NestJS S3 module

This is a simple NestJS AWS S3 library that allows you to use the AWS SDK v3 in a more friendly and familiar way, by providing you with injectable services for managing things like buckets and objects.

## Getting Started

To start using the module you first need to install it by simply running

```
yarn add @lab08/nestjs-s3
```

or

```
npm install @lab08/nestjs-s3
```

## Using the module

The module support multiple ways to initialize it.

The strait approach is simply just calling `S3Module.forRoot` and specifing the region, access key id and secret access key.

```typescript
S3Module.forRoot({
  region: 'eu-west-1',
  accessKeyId: 'test',
  secretAccessKey: 'test',
});
```

However, there are times, where the configuration is loaded from a service or depends on other providers. This can be achieved using the `S3Module.forRootAsync`.

```typescript
S3Module.forRootAsync({
  useFactory: () =>
    new Promise((resolve) => {
      resolve({
        region: 'eu-west-1',
        accessKeyId: 'test',
        secretAccessKey: 'test',
      });
    }),
});
```

Here is also an example, that uses the `@nestjs/config`.

```typescript
S3Module.forRootAsync({
  useFactory: (config) => {
    return config.get<S3Config>('config-key');
  },
  inject: [ConfigService],
  import: [ConfigModule],
});
```
## Authors and main contributors

- **Martin Andreev {'<martin.andreev@lab08.com>'}**
- **Dimitar Dishev {'<dishev@lab08.com>'}**
- **Veselin Angelov {'<veselin.angelov@lab08.com>'}**
