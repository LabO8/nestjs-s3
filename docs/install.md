# Instalation and usage

## Installing NestJS S3

## Using the NestJS S3 module in NestJS

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
