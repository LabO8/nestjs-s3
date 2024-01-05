---
id: prefixing
title: Prefixing
sidebar_label: Prefixing
slug: /prefixing
---

## Introduction

As our app grows, we might want to store our objects in a more organized way. This is where the prefix comes in.

The prefix is a string that is prepended to the object key. This allows us to organize our objects in a folder-like structure.

For example, if we have a bucket called `my-bucket` and we want to store our objects in a folder called `my-folder`, we can do that by prepending the prefix `my-folder/` to the object key.

## Usage

By default, the prefix is an empty string. This means that the object key is not modified, but if you set a prefix, when you initialize the module, the prefix will be prepended to the object key.

The default algorithm for prefixing will just prepend the prefix to the object key, but you can also specify a custom algorithm.

**All services like the `ObjectService` will use the prefix service by default.**

## Custom prefixing

In order to use a custom prefixing algorithm, you need to specify the `prefixingAlgorithm` when initializing the module.

```typescript
class CustomPrefixService implements IPrefixAlgorithm {
  prefix(remote: string, prefix: string, bucket?: string): string {
    return `${bucket}/${prefix}${remote}`;
  }
}

S3Module.forRoot({
  region: 'region',
  accessKeyId: '***',
  secretAccessKey: '***',
  prefix: 'test/',
  prefixAlgorithm: new CustomPrefixService(),
})
```

you can also use injectables

```typescript
 class CustomPrefixWithDIService implements IPrefixAlgorithm {
  public constructor(private readonly globalPrefix: string) {}

  prefix(remote: string, prefix: string, bucket?: string): string {
    return `${bucket}/${this.globalPrefix}${prefix}${remote}`;
  }
}

S3Module.forRootAsync({
  imports: [SomeModuleThatProvidesTheGlobalPrefix],
  prefixAlgorithmInject: ['GLOBAL_PREFIX'],
  prefixAlgorithmFactory: (globalPrefix: string) => new CustomPrefixWithDIService(globalPrefix),
  useFactory: () => ({
    region: 'region',
    accessKeyId: '***',
    secretAccessKey: '***',
    prefix: 'test/',
  }),
})
```