import { DefaultValue, NotRequired, Required } from './fields/mixed';
import { MinStringLength, MaxStringLength } from './fields/string';
import { MinArrayLength, MaxArrayLength } from './fields/array';

const validator = {
  mixed: {
    default: DefaultValue,
    notRequired: NotRequired,
    required: Required,
  },
  string: {
    min: MinStringLength,
    max: MaxStringLength,
  },
  array: {
    min: MinArrayLength,
    max: MaxArrayLength,
  },
};

export {
  validator,
};
