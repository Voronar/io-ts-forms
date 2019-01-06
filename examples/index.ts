import * as iots from 'io-ts';
import { pipe } from 'ramda';
import moment from 'moment';
import { validator, modifiers } from '../src';

const MomentDateTime = new iots.Type<moment.Moment, string>(
  'MomentDateTime',
  moment.isMoment,
  (inputValue, c) =>
    iots.string.validate(inputValue, c).chain((inputString) => {
      const momentValue = moment(inputString);
      return momentValue.isValid() ? iots.success(momentValue) : iots.failure(inputString, c);
    }),
  a => a.toISOString(),
);

console.log(MomentDateTime.encode(moment()));

const Person = iots.type({
  email: pipe(
    modifiers.label('Email'),
    modifiers.required(),
  )(iots.string)
    .pipe(validator.string.email())
    .pipe(validator.string.max(15))
    // .pipe(validator.string.regExpMatch(/.+@.+/))
  ,
  name: pipe(
    modifiers.label('Имя'),
    modifiers.default('Без имени'),
    modifiers.notRequired,
    )(iots.string)
    ,
  birthday: pipe(
    // modifiers.notRequired,
    // modifiers.default('2019-01-06'),
    modifiers.required(),
  )(MomentDateTime),
});

type P = iots.TypeOf<typeof Person>;

const val: Partial<P> = {
  email: 'a23sd@asd.com',
  birthday: '2019-01-06T13:42:07.892Z',
};

const rs = Person.validate(
  val,
  iots.appendContext(
    iots.getDefaultContext(Person),
    'GLOBAL_VALUE',
    {
      ...iots.any.asDecoder(),
      name: JSON.stringify(val),
    },
  ),
);

if (rs.isLeft()) {
  console.log('error', (rs.value));
} else {
  console.log((rs.value));
  console.log(Person.encode(rs.value));
}
