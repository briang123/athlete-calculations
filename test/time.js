import {
  calculateTime,
  DISTANCE_UNITS,
  PACE_UNITS,
} from 'athlete-calculations';

function time() {
  return {
    message: 'Calculating time from distance and pace',
    calculate: ({ distance, pace, format }) =>
      calculateTime({ distance, pace, format }),
  };
}

const t = time();
console.log(
  t.message,
  t.calculate({
    distance: { traveled: 3.1, units: DISTANCE_UNITS.MILES },
    pace: { hours: 0, minutes: 6, seconds: 34, units: PACE_UNITS.MILES },
    format: '%M:%SS',
  }),
);