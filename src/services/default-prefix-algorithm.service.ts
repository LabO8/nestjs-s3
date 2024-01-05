import { IPrefixAlgorithm } from '../interfaces';

export class DefaultPrefixAlgorithmService implements IPrefixAlgorithm {
  prefix(remote: string, prefix?: string): string {
    if (!prefix) {
      return remote;
    }

    return `${prefix}${remote}`;
  }
}
