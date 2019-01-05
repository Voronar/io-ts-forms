import * as iots from 'io-ts';
import { validator } from '../src';

const Person = iots.type({
  // TODO Make notRequired with default value
  name: validator.mixed.notRequired(iots.string)
    .pipe(validator.mixed.default('12311'))
    // .pipe(validator.string.max(4))
    // .pipe(validator.string.min(2))
  ,
  age: iots.number,
  genderId: iots.array(iots.number)
    .pipe(validator.array.min(1))
    .pipe(validator.array.max(3))
  ,
});

type p = iots.TypeOf<typeof Person>;

const val = {
  // name: '7',
  // age: 1,
  genderId: [2, 3, 3],
};

const rs = Person.validate(val, [
  ...iots.getDefaultContext(Person),
  {
    key: 'GLOBAL_VALUE',
    type: val,
  } as any,
]);

if (rs.isLeft()) {
  console.log('error', (rs.value));
} else {
  console.log((rs.value));
}
