---
id: "index"
title: "@lab08/nestjs-s3"
slug: "/api/"
sidebar_label: "Readme"
sidebar_position: 0
custom_edit_url: null
---

<div align="center">
  <a href="http://nestjs.com/" target="_blank">
    <img src="https://nestjs.com/img/logo_text.svg" width="300" alt="Nest Logo" />
  </a>
</div>

This is a simple NestJS AWS S3 library that allows you to use the AWS SDK v3 in a more friendly and familiar way, by providing you with injectable services for managing things like buckets and objects.

<h3 align="center">NestJS Amazon S3 library</h3>

<div align="center">
  <a href="https://nestjs.com" target="_blank">
    <img src="https://img.shields.io/badge/built%20with-NestJs-red.svg" alt="Built with NestJS" />
  </a>

![master](https://github.com/LabO8/nestjs-s3/actions/workflows/test.yml/badge.svg?branch=master)

</div>

## Authors

- **Martin Andreev <martin.andreev@lab08.com>**
- **Dimitar Dishev <dishev@lab08.com>**

## Development

1. Clone the repo
2. Run yarn install

```bash
cd nestjs-s3
yarn install
```

## Running tests

```bash
yarn test
```

## Installation

To install it simple run

```shell
yarn add @lab08/nestjs-s3
```

or

```shell
npm install @lab08/nestjs-s3
```

## Usage

The S3 module support multiple ways to init it

The strait approach is simple just calling `S3Module.forRoot` and specifing the region, access key id and secret access key.

```typescript
S3Module.forRoot({
  region: 'eu-west-1',
  accessKeyId: 'test',
  secretAccessKey: 'test',
});
```

However, there are times, where configuration if loaded from a service or depends on other providers. This can be achived using the `S3Module.forRootAsync`.

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
