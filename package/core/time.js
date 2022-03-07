const { formatter } = require('./format');
const {
  DISTANCE_UNITS,
  METERS_PER_MILE,
  METERS_PER_KM,
  PACE_UNITS,
} = require('./constants');
const {
  // getDistancePace,
  getMinutesFromHMS,
  getTimeParts,
  getTotalTimeTraveled,
  getTravelDistanceInMeters,
} = require('../utils/conversion');

function getDistancePace(minutes, units, unitTypes) {
  switch (units) {
    case unitTypes.MILES:
      return minutes / METERS_PER_MILE;
    case unitTypes.METERS:
    case unitTypes.KM:
      return minutes / METERS_PER_KM;
    default:
      throw new Error('Invalid unit type');
  }
}

//todo: validate parameters
function calculateTimeFromDistAndPace({
  distance = { traveled, units },
  pace = { hours, minutes, seconds, units },
  format = null,
} = {}) {
  const { traveled: dTravel, units: dUnits } = distance;
  const { hours: pHr, minutes: pMin, seconds: pSec, units: pUnits } = pace;

  const traveledInMeters = getTravelDistanceInMeters(
    dTravel,
    dUnits,
    DISTANCE_UNITS,
  );

  const paceMinutes = getMinutesFromHMS(pHr, pMin, pSec);
  const distancePace = getDistancePace(paceMinutes, pUnits, PACE_UNITS);
  const travelMinutes = getTotalTimeTraveled(traveledInMeters, distancePace);
  const timeParts = getTimeParts(travelMinutes);

  return {
    distance: `${dTravel} ${dUnits}`,
    pace: `${pHr}:${pMin}:${pSec}`,
    totalTime: {
      ...timeParts,
      formatted: formatter({
        format: format ?? '%D%Dl %H:%MM:%SS',
        ...timeParts,
      }),
    },
  };
}

module.exports = {
  calculateTimeFromDistAndPace,
};

//TODO: VALIDATION THOUGHTS...
// function containZeroValues(arr) {
//   return arr.some((v) => v === 0);
// }

// function areNonNegativeValues(arr) {
//   return arr.every((v) => v >= 0);
// }

// if (
//   !isNumber(hours) ||
//   !isNumber(minutes) ||
//   !isNumber(seconds) ||
//   !isNumber(distance)
// ) {
//   throw new Error(
//     'Hours, minutes, seconds, and distance must be a valid number',
//   );
// }

// if (containZeroValues([minutes, distance])) {
//   throw new Error('Minutes and distance must be greater than 0');
// }

// if (!areNonNegativeValues([hours, minutes, seconds, distance])) {
//   throw new Error('Negative values are not allowed');
// }
