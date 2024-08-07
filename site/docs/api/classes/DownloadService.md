# Class: DownloadService

## Constructors

### new DownloadService()

> **new DownloadService**(`httpClient`, `prefixService`, `signedUrlService`): [`DownloadService`](DownloadService.md)

#### Parameters

• **httpClient**: `HttpService`

• **prefixService**: [`PrefixService`](PrefixService.md)

• **signedUrlService**: [`SignedUrlService`](SignedUrlService.md)

#### Returns

[`DownloadService`](DownloadService.md)

#### Defined in

[utils/download.service.ts:12](https://github.com/LabO8/nestjs-s3/blob/49dee046307be2343007f81b5481193f2a950f4b/src/utils/download.service.ts#L12)

## Methods

### download()

> **download**(`bucket`, `remote`, `downloadDirectory`, `downloadOptions`?, `options`?): `Promise`\<`string`\>

#### Parameters

• **bucket**: `string`

• **remote**: `string`

• **downloadDirectory**: `string`

• **downloadOptions?**: [`DownloadOptions`](../type-aliases/DownloadOptions.md)

• **options?**: [`GetObjectOptions`](../type-aliases/GetObjectOptions.md)

#### Returns

`Promise`\<`string`\>

#### Defined in

[utils/download.service.ts:18](https://github.com/LabO8/nestjs-s3/blob/49dee046307be2343007f81b5481193f2a950f4b/src/utils/download.service.ts#L18)
