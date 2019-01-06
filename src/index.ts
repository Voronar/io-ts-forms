import { DefaultValue, Required, NotRequired, Label } from './fields/mixed';
import { MinStringLength, MaxStringLength, RegExpMatch, EmailMatch, RegExpMatch1 } from './fields/string';
// import { MinArrayLength, MaxArrayLength } from './fields/array';

const validator = {
  string: {
    min: MinStringLength,
    max: MaxStringLength,
    regExpMatch: RegExpMatch,
    regExpMatch1: RegExpMatch1,
    email: EmailMatch,
  },
  // array: {
  //   min: MinArrayLength,
  //   max: MaxArrayLength,
  // },
};

const modifiers = {
  default: DefaultValue,
  required: Required,
  label: Label,
  notRequired: NotRequired,
};

export {
  validator,
  modifiers,
};
