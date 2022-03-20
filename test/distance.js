import {
  calculateDistance,
  DISTANCE_UNITS,
  PACE_UNITS,
} from 'athlete-calculations';

function distance() {
  return {
    message: 'Calculating distance from time and pace',
    calculate: ({ distance, time, pace }) =>
      calculateDistance({
        distance,
        time,
        pace,
      }),
  };
}

const d = distance();
console.log(
  d.message,
  d.calculate({
    distance: { units: DISTANCE_UNITS.MILES },
    time: { hours: 0, minutes: 20, seconds: 21 },
    pace: { hours: 0, minutes: 6, seconds: 34, units: PACE_UNITS.MILES },
  }),
);
