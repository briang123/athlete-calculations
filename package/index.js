const { DISTANCE_UNITS, PACE_UNITS } = require('./core/constants');
const {
  calculateTime,
  calculatePace,
  calculateDistance,
} = require('./api/pace-calculator');

module.exports = {
  calculateTime,
  calculatePace,
  calculateDistance,
  DISTANCE_UNITS,
  PACE_UNITS,
};
