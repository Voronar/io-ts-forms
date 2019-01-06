import * as iots from 'io-ts';
export { Required } from './required';

export const DefaultValue = <T extends iots.Any>(defaultValue: iots.TypeOf<T>) => (
  type: T,
) => {
  return new iots.Type<iots.TypeOf<T>, iots.OutputOf<T>>(
    type.name,
    type.is,
    (value, c) => {
      const newValue = value === undefined ? defaultValue : value;

      return type.validate(newValue, c);
    },
    type.encode,
  );
};

export const Label = (label: string) => <T extends iots.Any>(
  type: T,
) => {
  return new iots.Type<iots.TypeOf<T>, iots.OutputOf<T>>(
    `|label|${label}|label|`,
    type.is,
    (value, context) => {
      return type.validate(value, context);
    },
    type.encode,
  );
};

export const NotRequired = <T extends iots.Any>(type: T) => iots.union([type, iots.undefined]);
