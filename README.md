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

# Documentation

If you want to read the more on the usage, you can check [the documentation](https://labo8.github.io/nestjs-s3/)

# Contributing

1. [Fork it](https://help.github.com/articles/fork-a-repo/)
2. Install dependencies (`yarn install`)
3. Create your feature branch (`git checkout -b feature/my-feature`)
4. Commit your changes (`git commit -am 'Added some feature'`)
5. Test your changes (`yarn test`)
6. Push to the branch (`git push origin feature/my-feature`)
7. [Create new Pull Request](https://help.github.com/articles/creating-a-pull-request/)

## Testing

We use [Jest](https://github.com/facebook/jest) to write tests. Run our test suite with this command:

```
yarn test
```

## Code Style

We use [Prettier](https://prettier.io/) and tslint to maintain code style and best practices.
Please make sure your PR adheres to the guides by running:

```
yarn format
```

and

```
yarn lint
```

## Authors

- **Martin Andreev <martin.andreev@lab08.com>**
- **Dimitar Dishev <dishev@lab08.com>**

## Docs

If you want to read the

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

## License

MIT License

Copyright (c) 2019 John Biundo

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.
