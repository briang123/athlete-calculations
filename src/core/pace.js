import { formatter } from './format.js';
import {
  METERS_PER_MILE,
  METERS_PER_KM,
  DISTANCE_UNITS,
  PACE_UNITS,
} from './constants.js';
import {
  checkForNumberTypes,
  checkForZeroValues,
  checkForNegativeValues,
  processValidations,
  getLabelValueObject,
} from './../utils/validate.js';
import {
  getMinutesFromHMS,
  getTravelDistanceInMeters,
  getTimeParts,
} from '../utils/conversion.js';

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

function paceValidator({ dTravel, tHr, tMin, tSec }) {
  const _tHr = getLabelValueObject('hour', tHr);
  const _tMin = getLabelValueObject('minutes', tMin);
  const _tSec = getLabelValueObject('seconds', tSec);
  const _dTravel = getLabelValueObject('distance', dTravel);

  const hr_min_sec_tvl = [_tHr, _tMin, _tSec, _dTravel];
  const validNumberCheckParams = checkForNumberTypes(hr_min_sec_tvl);
  const validZeroCheckParams = checkForZeroValues([_dTravel]);
  const validNonNegativeCheckParams = checkForNegativeValues(hr_min_sec_tvl);

  const queue = [
    validNumberCheckParams,
    validZeroCheckParams,
    validNonNegativeCheckParams,
  ];

  processValidations(queue);
}

//todo: validate parameters
export function calculatePaceFromDistAndTime({
  distance = { traveled, units },
  time = { hours, minutes, seconds },
  format = null,
} = {}) {
  const { traveled: dTravel, units: dUnits } = distance;
  const { hours: tHr, minutes: tMin, seconds: tSec } = time;

  paceValidator({ dTravel, tHr, tMin, tSec });

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
    pace: {
      ...timeParts,
      formatted: formatter({
        format: format ?? '%D%Dl %H:%MM:%SS',
        ...timeParts,
      }),
    },
  };
}

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
