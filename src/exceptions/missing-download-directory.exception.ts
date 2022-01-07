export class MissingDownloadDirectoryException extends Error {
  public constructor(path: string) {
    super(`Download directory ${path} does not exist.`);
  }
}
