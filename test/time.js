const { formatter } = require('./format');
const { DISTANCE_UNITS, PACE_UNITS } = require('./constants');
const {
  getPaceInMeters,
  getDistancePace,
  getDistanceTime,
  convertDecimalToSeconds,
  getDaysFromHours,
  getHours,
  getHoursFromMinutes,
  getMinutesFromHMS,
  getMinutesIntoHour,
  getTotalMinutesFromTime,
  getTotalTimeTraveled,
  getTravelDistanceInMeters,
} = require('./conversion');

function getTimeParts(time) {
  const totalMinutes = getTotalMinutesFromTime(time);
  const totalHours = getHoursFromMinutes(totalMinutes);

  const days = getDaysFromHours(totalHours);
  const hours = getHours(days, totalHours);
  const minutes = getMinutesIntoHour(totalMinutes);
  const seconds = convertDecimalToSeconds(time);

  return { days, hours, minutes, seconds };
}

//todo: validate parameters
function calculateTime({
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

//todo: validate parameters
function calculatePace({
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
  calculateTime,
  getTimeParts,
  calculatePace,
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
