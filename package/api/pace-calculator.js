const { calculateDistanceFromTimeAndPace } = require('./../core/distance');
const { calculateTimeFromDistAndPace } = require('./../core/time');
const { calculatePaceFromDistAndTime } = require('./../core/pace');

module.exports = {
  calculateDistance: calculateDistanceFromTimeAndPace,
  calculateTime: calculateTimeFromDistAndPace,
  calculatePace: calculatePaceFromDistAndTime,
};
