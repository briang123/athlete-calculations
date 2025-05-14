import { round } from '../utils/common.js';
import {
  checkForNumberTypes,
  checkForNegativeValues,
  processValidations,
  getLabelValueObject,
} from './../utils/validate.js';
import { getMinutesFromHMS } from '../utils/conversion.js';

function getDistance(time, pace) {
  return time / pace;
}

function distanceValidator({ tHr, tMin, tSec, pHr, pMin, pSec }) {
  const _tHr = getLabelValueObject('time hour', tHr);
  const _tMin = getLabelValueObject('time minutes', tMin);
  const _tSec = getLabelValueObject('time seconds', tSec);
  const _pHr = getLabelValueObject('pace hours', pHr);
  const _pMin = getLabelValueObject('pace minutes', pMin);
  const _pSec = getLabelValueObject('pace seconds', pSec);

  const hr_min_sec = [_tHr, _tMin, _tSec, _pHr, _pMin, _pSec];
  const validNumberCheckParams = checkForNumberTypes(hr_min_sec);
  const validNonNegativeCheckParams = checkForNegativeValues(hr_min_sec);

  const queue = [validNumberCheckParams, validNonNegativeCheckParams];

  processValidations(queue);
}

export function calculateDistanceFromTimeAndPace({
  distance = { units },
  time = { hours, minutes, seconds },
  pace = { hours, minutes, seconds, units },
} = {}) {
  const { units: dUnits } = distance;
  const { hours: tHr, minutes: tMin, seconds: tSec } = time;
  const { hours: pHr, minutes: pMin, seconds: pSec, units: pUnits } = pace;

  distanceValidator({ tHr, tMin, tSec, pHr, pMin, pSec });

  const timeMinutes = getMinutesFromHMS(tHr, tMin, tSec);
  const paceMinutes = getMinutesFromHMS(pHr, pMin, pSec);
  const dist = getDistance(timeMinutes, paceMinutes);

  return {
    time: `${tHr}:${tMin}:${tSec}`,
    pace: `${pHr}:${pMin}:${pSec} ${pUnits}`,
    distance: {
      traveled: round(dist, 2),
      traveledShort: round(dist, 1),
      units: dUnits,
    },
  };
}
