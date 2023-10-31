---
id: "DownloadService"
title: "Class: DownloadService"
sidebar_label: "DownloadService"
sidebar_position: 0
custom_edit_url: null
---

## Constructors

### constructor

• **new DownloadService**(`httpClient`, `prefixService`, `signedUrlService`)

#### Parameters

| Name | Type |
| :------ | :------ |
| `httpClient` | `HttpService` |
| `prefixService` | [`PrefixService`](PrefixService) |
| `signedUrlService` | [`SignedUrlService`](SignedUrlService) |

#### Defined in

[utils/download.service.ts:12](https://github.com/LabO8/nestjs-s3/blob/65a196f/src/utils/download.service.ts#L12)

## Methods

### download

▸ **download**(`bucket`, `remote`, `downloadDirectory`, `downloadOptions?`, `options?`): `Promise`<`string`\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `bucket` | `string` |
| `remote` | `string` |
| `downloadDirectory` | `string` |
| `downloadOptions?` | [`DownloadOptions`](../modules#downloadoptions) |
| `options?` | [`GetObjectOptions`](../modules#getobjectoptions) |

#### Returns

`Promise`<`string`\>

#### Defined in

[utils/download.service.ts:18](https://github.com/LabO8/nestjs-s3/blob/65a196f/src/utils/download.service.ts#L18)
