import * as iots from 'io-ts';

export type ExtendedDecoder<I = any, A = any> = {
  errorMessage: string;
} & iots.Decoder<I, A>;

export const addErrorToContext = <T extends iots.Decoder<any, any>>(
  context: iots.Context,
  decoder: T,
  key: string,
  errorMessage: string,
) => {
  const newContext: iots.Context = [...context, {
    key,
    type: {
      ...decoder,
      name: errorMessage,
    },
  }];

  return newContext;
};
