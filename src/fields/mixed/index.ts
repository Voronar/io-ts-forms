import * as iots from 'io-ts';
export { Required } from './required';

export const DefaultValue = (defaultValue: string) => new iots.Type(
  'DefaultValue',
  iots.any.is,
  (value: any) => {
    const newValue = value === undefined ? defaultValue : value;
    return iots.success(newValue);
  },
  iots.any.encode,
);

export const NotRequired = <T extends iots.Type<any>>(type: T) => iots.union([type, iots.undefined]);
