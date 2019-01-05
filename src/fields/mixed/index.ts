import * as iots from 'io-ts';
export { Required } from './required';

export const DefaultValue = <T extends iots.Any>(
  type: T,
  defaultValue: iots.TypeOf<T>,
) => {
  return new iots.Type<iots.TypeOf<T>, iots.OutputOf<T>>(
    'DefaultValue',
    type.is,
    (value, c) => {
      const newValue = value === undefined ? defaultValue : value;

      return type.validate(newValue, c);
    },
    type.encode,
  );
};
