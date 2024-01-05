import { IPrefixAlgorithm } from '../interfaces';

export class DefaultPrefixAlgorithmService implements IPrefixAlgorithm {
  prefix(remote: string, prefix?: string, bucket?: string): string {
    if (!prefix) {
      return remote;
    }

    return `${prefix}${remote}`;
  }
}
