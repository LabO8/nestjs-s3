# Multipart Upload

The Multipart Upload Service provides functionality for uploading large files to S3 using the multipart upload API. This approach is recommended for files larger than 100MB and allows you to:

- Upload large files in smaller, manageable parts
- Resume failed uploads
- Upload parts in parallel for better performance
- Upload files while they're being created

## Overview

A multipart upload involves three main steps:

1. **Initiate** - Start a new multipart upload and get an upload ID
2. **Upload Parts** - Upload file chunks using presigned URLs
3. **Complete** - Finalize the upload by providing the list of uploaded parts

Alternatively, you can **abort** an upload if something goes wrong.

## Configuration

You can configure the default part size for multipart uploads globally when setting up the S3Module:

```typescript
S3Module.forRoot({
  region: 'us-east-1',
  accessKeyId: 'your-access-key',
  secretAccessKey: 'your-secret-key',
  multipartUpload: {
    defaultPartSize: 10 * 1024 * 1024, // 10MB (default is 5MB)
  },
});
```

**Configuration Options:**

- `defaultPartSize` - Default part size in bytes (must be at least 5MB)
  - Default: `5242880` (5MB - AWS minimum)
  - Recommendation: Use 10MB or higher for better performance with large files
  - This is used when `calculatePartSize()` is called without a preferred size

## Usage

```typescript
import { MultipartUploadService } from '@lab08/nestjs-s3';

@Injectable()
export class UploadService {
  constructor(
    private readonly multipartUploadService: MultipartUploadService,
  ) {}
}
```

## Basic Workflow

```typescript
// Step 1: Initiate upload
const { uploadId, key } = await multipartUploadService.initiateMultipartUpload(
  'my-bucket',
  'large-file.zip',
  { ContentType: 'application/zip' }
);

// Step 2: Calculate part size
const { partSize, totalParts } = multipartUploadService.calculatePartSize(fileSize);

// Step 3: Upload each part using presigned URLs
const parts = [];
for (let partNumber = 1; partNumber <= totalParts; partNumber++) {
  const { url } = await multipartUploadService.getUploadPartPresignedUrl(
    'my-bucket',
    key,
    uploadId,
    partNumber
  );
  
  // Upload part data to presigned URL
  const response = await axios.put(url, partData);
  parts.push({ ETag: response.headers.etag, PartNumber: partNumber });
}

// Step 4: Complete upload
await multipartUploadService.completeMultipartUpload(
  'my-bucket',
  key,
  uploadId,
  parts
);
```

## API Reference

### initiateMultipartUpload

```typescript
async initiateMultipartUpload(
  bucket: string,
  key: string,
  options?: MultipartUploadOptions,
): Promise<MultipartUploadInitiation>
```

Initiates a multipart upload. Returns `uploadId` and prefixed `key` to use in subsequent operations.

### getUploadPartPresignedUrl

```typescript
async getUploadPartPresignedUrl(
  bucket: string,
  key: string,
  uploadId: string,
  partNumber: number,
  expiresIn?: number,
): Promise<PresignedUploadUrl>
```

Generates presigned URL for uploading a part (1-10000). Use the `key` from initiate response.

### completeMultipartUpload

```typescript
async completeMultipartUpload(
  bucket: string,
  key: string,
  uploadId: string,
  parts: UploadPart[],
): Promise<MultipartUploadCompletion>
```

Completes upload. `parts` must be sorted by `PartNumber` with `ETag` from upload responses.

### abortMultipartUpload

```typescript
async abortMultipartUpload(
  bucket: string,
  key: string,
  uploadId: string,
): Promise<MultipartUploadAbortion>
```

Aborts upload and removes uploaded parts.

### listParts

```typescript
async listParts(
  bucket: string,
  key: string,
  uploadId: string,
  maxParts?: number,
  partNumberMarker?: number,
): Promise<ListPartsResult>
```

Lists uploaded parts for an upload.

### calculatePartSize

```typescript
calculatePartSize(
  fileSize: number,
  preferredPartSize?: number
): PartSizeCalculation
```

Calculates optimal part size and total number of parts for a file.

**Parameters:**

- `fileSize` - Total file size in bytes (must be > 0)
- `preferredPartSize` - Optional preferred part size in bytes (must be greater or equal to 5MB if provided)

**Returns:** `{ partSize: number, totalParts: number }`

**Priority order for part size:**

1. `preferredPartSize` parameter (highest priority)
2. Module configuration `defaultPartSize`
3. AWS minimum 5MB (fallback)

The function automatically increases part size if needed to stay within AWS's 10,000 part limit.

**Examples:**

```typescript
// Use configured default (or AWS minimum if not configured)
const result1 = multipartUploadService.calculatePartSize(100 * 1024 * 1024);
// Uses module config or 5MB

// Override with custom part size for this specific calculation
const result2 = multipartUploadService.calculatePartSize(
  100 * 1024 * 1024,
  50 * 1024 * 1024 // Use 50MB parts
);

// Auto-adjusts for very large files
const result3 = multipartUploadService.calculatePartSize(100 * 1024 * 1024 * 1024);
// Automatically increases part size to stay within 10,000 parts limit
```

## Important Notes

- **Store the key**: Use the `key` returned from `initiateMultipartUpload` for all subsequent operations (it includes prefixes)
- **Sort parts**: Parts must be sorted by `PartNumber` when completing upload
- **Always abort on failure**: Prevent orphaned parts by aborting failed uploads
- **Part constraints**: Min 5MB (except last), max 10,000 parts, part numbers 1-10000
- **Transfer Acceleration**: Combine multipart uploads with S3 Transfer Acceleration to reduce latency by routing data through AWS edge locations. You need to enable the accelerated endpoint for your bucket in the AWS S3 console, and then configure the S3Module as follows:
  
```typescript
S3Module.forRoot({
// ...other config...
  useAccelerateEndpoint: true, // Enable Transfer Acceleration
});
```

## Prefix Configuration

```typescript
// Uses global prefix
const result = await multipartUploadService.initiateMultipartUpload('bucket', 'file.zip');
// result.key = 'prefix/file.zip'

// Disable auto-prefix
const result = await multipartUploadService.initiateMultipartUpload(
  'bucket',
  'file.zip',
  { disableAutoPrefix: true }
);
// result.key = 'file.zip'
```

## Error Handling

```typescript
try {
  const { uploadId, key } = await multipartUploadService.initiateMultipartUpload(...);
  // ... upload parts ...
  await multipartUploadService.completeMultipartUpload(bucket, key, uploadId, parts);
} catch (error) {
  await multipartUploadService.abortMultipartUpload(bucket, key, uploadId);
  throw error;
}
```
