import { OptionsWithAutoPrefix } from '../types';

export const prepareOptions = (
  options: OptionsWithAutoPrefix,
): {
  options: Omit<OptionsWithAutoPrefix, 'disableAutoPrefix'>;
  disableAutoPrefix: boolean;
} => {
  const disableAutoPrefix = options?.disableAutoPrefix ?? false;

  delete options?.disableAutoPrefix;

  return { options, disableAutoPrefix };
};
