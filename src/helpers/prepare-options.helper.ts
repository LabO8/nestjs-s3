import { DisableAutoPrefix, OptionsWithAutoPrefix, PrefixContext } from '../types';

export const prepareOptions = (
  options: OptionsWithAutoPrefix,
): {
  options: Omit<OptionsWithAutoPrefix, keyof DisableAutoPrefix | keyof PrefixContext>;
} & DisableAutoPrefix &
  PrefixContext => {
  const disableAutoPrefix = options?.disableAutoPrefix ?? false;
  const prefixContext = options?.prefixContext ?? null;

  delete options?.disableAutoPrefix;
  delete options?.prefixContext;

  return { options, disableAutoPrefix, prefixContext };
};
