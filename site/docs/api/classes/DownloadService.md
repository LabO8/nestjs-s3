# Class: DownloadService

Defined in: [utils/download.service.ts:11](https://github.com/LabO8/nestjs-s3/blob/ad059a6199bca96cb3120eb68144ed879ab6c69e/src/utils/download.service.ts#L11)

## Constructors

### Constructor

> **new DownloadService**(`httpClient`, `prefixService`, `signedUrlService`): `DownloadService`

Defined in: [utils/download.service.ts:12](https://github.com/LabO8/nestjs-s3/blob/ad059a6199bca96cb3120eb68144ed879ab6c69e/src/utils/download.service.ts#L12)

#### Parameters

##### httpClient

`HttpService`

##### prefixService

[`PrefixService`](PrefixService.md)

##### signedUrlService

[`SignedUrlService`](SignedUrlService.md)

#### Returns

`DownloadService`

## Methods

### download()

> **download**(`bucket`, `remote`, `downloadDirectory`, `downloadOptions?`, `options?`): `Promise`\<`string`\>

Defined in: [utils/download.service.ts:18](https://github.com/LabO8/nestjs-s3/blob/ad059a6199bca96cb3120eb68144ed879ab6c69e/src/utils/download.service.ts#L18)

#### Parameters

##### bucket

`string`

##### remote

`string`

##### downloadDirectory

`string`

##### downloadOptions?

[`DownloadOptions`](../type-aliases/DownloadOptions.md)

##### options?

[`GetObjectOptions`](../type-aliases/GetObjectOptions.md)

#### Returns

`Promise`\<`string`\>
