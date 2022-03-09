import { formatter } from './format.js';

import {
  checkForNumberTypes,
  checkForZeroValues,
  checkForNegativeValues,
  processValidations,
  getLabelValueObject,
} from './../utils/validate.js';
import {
  DISTANCE_UNITS,
  METERS_PER_MILE,
  METERS_PER_KM,
  PACE_UNITS,
} from './constants.js';
import {
  getMinutesFromHMS,
  getTimeParts,
  getTotalTimeTraveled,
  getTravelDistanceInMeters,
} from '../utils/conversion.js';

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

function timeValidator({ dTravel, pHr, pMin, pSec }) {
  const _pHr = getLabelValueObject('hour', pHr);
  const _pMin = getLabelValueObject('minutes', pMin);
  const _pSec = getLabelValueObject('seconds', pSec);
  const _dTravel = getLabelValueObject('distance', dTravel);

  const hr_min_sec_tvl = [_pHr, _pMin, _pSec, _dTravel];
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

export function calculateTimeFromDistAndPace({
  distance = { traveled, units },
  pace = { hours, minutes, seconds, units },
  format = null,
} = {}) {
  const { traveled: dTravel, units: dUnits } = distance;
  const { hours: pHr, minutes: pMin, seconds: pSec, units: pUnits } = pace;

  timeValidator({ dTravel, pHr, pMin, pSec });

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
    time: {
      ...timeParts,
      formatted: formatter({
        format: format ?? '%D%Dl %H:%MM:%SS',
        ...timeParts,
      }),
    },
  };
}
