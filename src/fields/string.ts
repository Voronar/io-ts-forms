import * as iots from 'io-ts';
import { NotRequired } from './mixed';
import { addErrorToContext } from './utils';

type NotRequiredStringType = string | undefined;

const encoder = (value: NotRequiredStringType) => value === undefined ? value : String(value);
const guard = NotRequired(iots.string).is;

export const MaxStringLength = (max: number) => new iots.Type(
  'MaxStringLength',
  guard,
  (value: NotRequiredStringType, context) => {
    const valid = value === undefined || value.length <= max;
    const newContext = addErrorToContext(
      context,
      context[context.length - 1].type,
      'MAX_LENGTH_ERROR',
      'max error',
    );

    return valid ? iots.success(value) : iots.failure(value, newContext);
  },
  encoder,
);

export const MinStringLength = (min: number) => new iots.Type(
  'MinStringLength',
  guard,
  (value: NotRequiredStringType, context) => {
    const valid = value === undefined || value.length >= min;
    const newContext = addErrorToContext(
      context,
      context[context.length - 1].type,
      'MIN_LENGTH_ERROR',
      'min error',
    );

    return valid ? iots.success(value) : iots.failure(value, newContext);
  },
  encoder,
);
