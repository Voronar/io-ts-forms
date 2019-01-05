import * as iots from 'io-ts';
import { addErrorToContext } from './utils';

const union = [iots.string, iots.undefined];
const stringOrUndefined = iots.union(union);
type NotRequiredStringType = iots.TypeOf<typeof stringOrUndefined>;

export const MaxStringLength = (max: number) => new iots.UnionType(
  'MaxStringLength',
  stringOrUndefined.is,
  (value: NotRequiredStringType, context) => {
    const valid = value !== undefined && value.length <= max;
    const newContext = addErrorToContext(
      context,
      context[context.length - 1].type,
      'MAX_LENGTH_ERROR',
      'max error',
    );

    return valid ? iots.success(value) : iots.failure(value, newContext);
  },
  stringOrUndefined.encode,
  union,
);

export const MinStringLength = (min: number) => new iots.UnionType(
  'MinStringLength',
  stringOrUndefined.is,
  (value: NotRequiredStringType, context) => {
    const valid = value !== undefined && value.length >= min;
    const newContext = addErrorToContext(
      context,
      context[context.length - 1].type,
      'MIN_LENGTH_ERROR',
      'min error',
    );

    return valid ? iots.success(value) : iots.failure(value, newContext);
  },
  stringOrUndefined.encode,
  union,
);
