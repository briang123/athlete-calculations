const { formatter } = require('./format');
const {
  METERS_PER_MILE,
  METERS_PER_KM,
  DISTANCE_UNITS,
  PACE_UNITS,
} = require('./constants');
const {
  getMinutesFromHMS,
  getTravelDistanceInMeters,
  getTimeParts,
} = require('../utils/conversion');

function getPaceInMeters(time, distance) {
  return time / distance;
}

function getDistanceTime(minutes, units, unitTypes) {
  switch (units) {
    case unitTypes.MILES:
      return minutes * METERS_PER_MILE;
    case unitTypes.METERS:
    case unitTypes.KM:
      return minutes / METERS_PER_KM;
    default:
      throw new Error('Invalid unit type');
  }
}

//todo: validate parameters
function calculatePaceFromDistAndTime({
  distance = { traveled, units },
  time = { hours, minutes, seconds },
  format = null,
} = {}) {
  const { traveled: dTravel, units: dUnits } = distance;
  const { hours: tHr, minutes: tMin, seconds: tSec } = time;

  const traveledInMeters = getTravelDistanceInMeters(
    dTravel,
    dUnits,
    DISTANCE_UNITS,
  );

  const timeMinutes = getMinutesFromHMS(tHr, tMin, tSec);
  const pacePerMeter = getPaceInMeters(timeMinutes, traveledInMeters);
  const distancePace = getDistanceTime(pacePerMeter, dUnits, PACE_UNITS);
  const timeParts = getTimeParts(distancePace);

  return {
    distance: `${dTravel} ${dUnits}`,
    time: `${tHr}:${tMin}:${tSec}`,
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
  calculatePaceFromDistAndTime,
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
