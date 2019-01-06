import * as iots from 'io-ts';
import { addErrorToContext } from './utils';

const union = [iots.string, iots.undefined];
const stringOrUndefined = iots.union(union);
type NotRequiredStringType = iots.TypeOf<typeof stringOrUndefined>;

export const MaxStringLength = (max: number) => new iots.UnionType(
  'MaxStringLength',
  stringOrUndefined.is,
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
  stringOrUndefined.encode,
  union,
);

export const MinStringLength = (min: number) => new iots.UnionType(
  'MinStringLength',
  stringOrUndefined.is,
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
  stringOrUndefined.encode,
  union,
);

export const RegExpMatch = (regExpStr: RegExp) => new iots.UnionType(
  'RegExpMatch',
  stringOrUndefined.is,
  (value: NotRequiredStringType, context) => {
    const valid = value === undefined || regExpStr.test(value);
    const newContext = addErrorToContext(
      context,
      context[context.length - 1].type,
      'REGEXP_MATCH_ERROR',
      'RegExp match error',
    );
    console.log('regExpStr', context[context.length - 1].key);

    return valid ? iots.success(value) : iots.failure(value, newContext);
  },
  stringOrUndefined.encode,
  union,
);

// tslint:disable-next-line:max-line-length
export const EmailMatch = () => RegExpMatch(/(?:[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*|"(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21\x23-\x5b\x5d-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])*")@(?:(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?|\[(?:(?:(2(5[0-5]|[0-4][0-9])|1[0-9][0-9]|[1-9]?[0-9]))\.){3}(?:(2(5[0-5]|[0-4][0-9])|1[0-9][0-9]|[1-9]?[0-9])|[a-z0-9-]*[a-z0-9]:(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21-\x5a\x53-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])+)\])/);
