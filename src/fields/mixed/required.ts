import * as iots from 'io-ts';
import { addErrorToContext } from '../utils';

const defaultCreateError = (field: string) => `Field '${field}' must be required`;

export const Required = (createError = defaultCreateError) => <T extends iots.Type<any>>(
  type: T,
) => new iots.Type<T['_A'], T['_O'], T['_I']>(
  'Required',
  type.is,
  (value, context) => {
    const valid = value !== undefined;

    const newContext = addErrorToContext(
      context,
      type.asDecoder(),
      'REQUIRED_ERROR',
      createError(context[context.length - 1].key),
    );

    return valid ? type.validate(value, context) : iots.failure(value, newContext);
  },
  type.encode,
);
