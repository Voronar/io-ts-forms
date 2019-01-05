import * as iots from 'io-ts';
import { pipe } from 'ramda';
import { validator } from '../src';

const Person = iots.type({
  // TODO Make notRequired with default value
  // name: validator.mixed.required(iots.string)
    // .pipe(validator.string.max(4))
    // .pipe(validator.string.min(2))
  // ,
  // email: validator.mixed.required(iots.string),
  // phone: validator.mixed.required(iots.string),
  // age: iots.number,
  genderId: validator.mixed.required(iots.array(iots.number))
    // .pipe(validator.array.min(1))
    // .pipe(validator.array.max(3))
  ,
  // name: validator.mixed.required(iots.string).pipe(validator.string.min(4)),
  gender: iots.partial({
    name: (iots.string)
      .pipe(validator.string.min(1))
      .pipe(validator.string.max(5))
    ,

  }),
});

type p = iots.TypeOf<typeof Person>;

const val = {
  // name: '1117',
  // age: 1,
  genderId: [2, 3, 3],
  gender: {
    name: '123456',
  },
  // id: '1234',
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
