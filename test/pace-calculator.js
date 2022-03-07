const { calculateDistanceFromTimeAndPace } = require('./distance');
const { calculateTimeFromDistAndPace } = require('./time');
const { calculatePaceFromDistAndTime } = require('./pace');

module.exports = {
  calculateDistance: calculateDistanceFromTimeAndPace,
  calculateTime: calculateTimeFromDistAndPace,
  calculatePace: calculatePaceFromDistAndTime,
};
