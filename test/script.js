const { DISTANCE_UNITS, PACE_UNITS } = require('./constants');
const { calculateTime, calculatePace } = require('./time');
const { calculateDistance } = require('./distance');

function time({ distance, pace, format }) {
  return {
    message: 'Calculating time from distance and pace',
    calculate: () => calculateTime({ distance, pace, format }),
  };
}

function pace({ distance, time, format }) {
  return {
    message: 'Calculating pace from time and distance',
    calculate: () =>
      calculatePace({
        distance,
        time,
        format,
      }),
  };
}

function distance({ distance, time, pace }) {
  //  const { units: dUnits } = distance;
  // const { hours: tHrs, minutes: tMin, seconds: tSec } = time;
  // const { hours: pHrs, minutes: pMin, seconds: pSec, units: pUnits } = pace;

  return {
    message: 'Calculating distance from time and pace',
    calculate: () =>
      calculateDistance({
        distance,
        time,
        pace,
      }),
  };
}

//==============================================================================
//TESTS
const t = time({
  distance: { traveled: 3.1, units: DISTANCE_UNITS.MILES },
  pace: { hours: 0, minutes: 6, seconds: 34, units: PACE_UNITS.MILES },
  format: '%M:%SS',
});
console.log(t.message, t.calculate());

const d = distance({
  distance: { units: DISTANCE_UNITS.MILES },
  time: { hours: 0, minutes: 20, seconds: 21 },
  pace: { hours: 0, minutes: 6, seconds: 34, units: PACE_UNITS.MILES },
});
console.log(d.message, d.calculate());

const p = pace({
  distance: { traveled: 3.1, units: DISTANCE_UNITS.MILES },
  time: { hours: 0, minutes: 20, seconds: 21, units: PACE_UNITS.MILES },
  format: '%M:%SS',
});
console.log(p.message, p.calculate());
