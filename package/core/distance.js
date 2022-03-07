const { round } = require('../utils/common');
const { getMinutesFromHMS } = require('../utils/conversion');

function getDistance(time, pace) {
  return time / pace;
}

//todo: validate parameters
const calculateDistanceFromTimeAndPace = ({
  distance = { units },
  time = { hours, minutes, seconds },
  pace = { hours, minutes, seconds, units },
} = {}) => {
  const { units: dUnits } = distance;
  const { hours: tHr, minutes: tMin, seconds: tSec } = time;
  const { hours: pHr, minutes: pMin, seconds: pSec, units: pUnits } = pace;

  const timeMinutes = getMinutesFromHMS(tHr, tMin, tSec);
  const paceMinutes = getMinutesFromHMS(pHr, pMin, pSec);
  const dist = getDistance(timeMinutes, paceMinutes);

  return {
    time: `${tHr}:${tMin}:${tSec}`,
    pace: `${pHr}:${pMin}:${pSec} ${pUnits}`,
    totalDistance: {
      distance: round(dist, 2),
      units: dUnits,
    },
  };
};

module.exports = {
  calculateDistanceFromTimeAndPace,
};
