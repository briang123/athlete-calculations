const { round } = require('./core');
const {
  getDistance,
  getDistancePace,
  getDistanceTime,
  getMinutesFromHMS,
} = require('./conversion');

//todo: validate parameters
const calculateDistance = ({
  distance = { units },
  time = { hours, minutes, seconds },
  pace = { hours, minutes, seconds, units },
} = {}) => {
  const { units: dUnits } = distance;
  const { hours: tHr, minutes: tMin, seconds: tSec } = time;
  const { hours: pHr, minutes: pMin, seconds: pSec, units: pUnits } = pace;

  const timeMinutes = getMinutesFromHMS(tHr, tMin, tSec);
  const paceMinutes = getMinutesFromHMS(pHr, pMin, pSec);
  const dist = round(getDistance(timeMinutes, paceMinutes), 2);

  return {
    time: `${tHr}:${tMin}:${tSec}`,
    pace: `${pHr}:${pMin}:${pSec} ${pUnits}`,
    totalDistance: {
      distance: dist,
      units: dUnits,
    },
  };
};

module.exports = {
  getDistance,
  getDistancePace,
  getDistanceTime,
  calculateDistance,
};
