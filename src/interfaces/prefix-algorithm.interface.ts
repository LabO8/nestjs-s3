export interface IPrefixAlgorithm {
  prefix(remote: string, prefix?: string, bucket?: string): string;
}
