import * as iots from 'io-ts';
import { NotRequired } from './mixed';

export const MaxArrayLength = (max: number) => iots.refinement(
  NotRequired(iots.array(iots.any)),
  n => n === undefined || n.length <= max,
  'MaxArrayLength',
);

export const MinArrayLength = (min: number) => iots.refinement(
  NotRequired(iots.array(iots.any)),
  n => n === undefined || n.length >= min,
  'MinArrayLength',
);
