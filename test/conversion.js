const { getDecimalPart } = require('./core');
const {
  DISTANCE_UNITS,
  HOURS_PER_DAY,
  METERS_PER_KM,
  METERS_PER_MILE,
  MINUTES_PER_HOUR,
  METERS_AROUND_TRACK,
  PACE_UNITS,
  SECONDS_PER_MINUTE,
} = require('./constants');

function getMinutesFromSeconds(seconds) {
  return seconds / SECONDS_PER_MINUTE;
}

function getSecondsFromMinutes(minutes) {
  return Math.round(minutes * SECONDS_PER_MINUTE);
}

function getHoursFromMinutes(minutes) {
  return Math.floor(minutes / MINUTES_PER_HOUR);
}

function getHours(days, hours) {
  return hours - days * HOURS_PER_DAY;
}

function getMinutesIntoHour(totalMinutes) {
  return totalMinutes % MINUTES_PER_HOUR;
}

function getMinutesFromHMS(hours, minutes, seconds) {
  return hours * MINUTES_PER_HOUR + minutes * 1 + seconds / SECONDS_PER_MINUTE;
}

function getTotalTimeTraveled(distance, time) {
  return distance * time;
}

function getPaceInMeters(time, distance) {
  return time / distance;
}

function getDaysFromHours(hours) {
  return Math.floor(hours / HOURS_PER_DAY);
}
function getTotalMinutesFromTime(time) {
  return Math.floor(time);
}

function convertDecimalToSeconds(minutes) {
  const decimalSeconds = getDecimalPart(minutes);
  return getSecondsFromMinutes(decimalSeconds);
}

function getTravelDistanceInMeters(distance, units, unitTypes) {
  switch (units) {
    case unitTypes.MILES:
      return distance * METERS_PER_MILE;
    case unitTypes.KM:
      return distance / METERS_PER_MILE;
    // case unitTypes.METERS:
    //   return distance / METERS_AROUND_TRACK;
    default:
      throw new Error('Invalid unit type');
  }
}

function getDistance(time, pace) {
  return time / pace;
}

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

module.exports = {
  convertDecimalToSeconds,
  getDaysFromHours,
  getDistance,
  getDistancePace,
  getDistanceTime,
  getHours,
  getHoursFromMinutes,
  getMinutesFromHMS,
  getMinutesFromSeconds,
  getMinutesIntoHour,
  getPaceInMeters,
  getSecondsFromMinutes,
  getTotalMinutesFromTime,
  getTotalTimeTraveled,
  getTravelDistanceInMeters,
};
