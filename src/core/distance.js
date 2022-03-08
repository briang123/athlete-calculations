import { round } from '../utils/common.js';
import { getMinutesFromHMS } from '../utils/conversion.js';

function getDistance(time, pace) {
  return time / pace;
}

//todo: validate parameters
export function calculateDistanceFromTimeAndPace({
  distance = { units },
  time = { hours, minutes, seconds },
  pace = { hours, minutes, seconds, units },
} = {}) {
  const { units: dUnits } = distance;
  const { hours: tHr, minutes: tMin, seconds: tSec } = time;
  const { hours: pHr, minutes: pMin, seconds: pSec, units: pUnits } = pace;

  const timeMinutes = getMinutesFromHMS(tHr, tMin, tSec);
  const paceMinutes = getMinutesFromHMS(pHr, pMin, pSec);
  const dist = getDistance(timeMinutes, paceMinutes);

  return {
    time: `${tHr}:${tMin}:${tSec}`,
    pace: `${pHr}:${pMin}:${pSec} ${pUnits}`,
    distance: {
      traveled: round(dist, 2),
      units: dUnits,
    },
  };
}
