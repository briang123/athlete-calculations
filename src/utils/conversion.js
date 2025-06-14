import {
  DISTANCE_UNITS,
  HOURS_PER_DAY,
  METERS_PER_KM,
  METERS_PER_MILE,
  MINUTES_PER_HOUR,
  METERS_AROUND_TRACK,
  PACE_UNITS,
  SECONDS_PER_MINUTE,
} from '../core/constants.js';
import { round } from '../utils/common.js';

export function getTimeParts(time) {
  const totalMinutes = getTotalMinutesFromTime(time);
  const totalHours = getHoursFromMinutes(totalMinutes);

  const days = getDaysFromHours(totalHours);
  const hours = getHours(days, totalHours);
  const minutes = getMinutesIntoHour(totalMinutes);
  const seconds = convertDecimalToSeconds(time);

  return { days, hours, minutes, seconds };
}

export function getDecimalPart(value, places = 99) {
  return round(value % 1, places);
  // return round(value % 1, places);
}

export function getMinutesFromSeconds(seconds) {
  return seconds / SECONDS_PER_MINUTE;
}

export function getSecondsFromMinutes(minutes) {
  return Math.round(minutes * SECONDS_PER_MINUTE);
}

export function getHoursFromMinutes(minutes) {
  return Math.floor(minutes / MINUTES_PER_HOUR);
}

export function getHours(days, hours) {
  return hours - days * HOURS_PER_DAY;
}

export function getMinutesIntoHour(totalMinutes) {
  return totalMinutes % MINUTES_PER_HOUR;
}

export function getTimePartsFromTimeString(time) {
  const _h = Number(time.split(':')[0]);
  const _m = Number(time.split(':')[1]);
  const _s = Number(time.split(':')[2]);
  const totalMinutes = getMinutesFromHMS(_h, _m, _s);
  return getTimeParts(totalMinutes);
}

export function getMinutesFromHMS(hours, minutes, seconds) {
  return hours * MINUTES_PER_HOUR + minutes * 1 + seconds / SECONDS_PER_MINUTE;
}

export function getTotalTimeTraveled(distance, time) {
  return distance * time;
}

export function getDaysFromHours(hours) {
  return Math.floor(hours / HOURS_PER_DAY);
}

export function getTotalMinutesFromTime(time) {
  return Math.floor(time);
}

export function convertDecimalToSeconds(minutes) {
  const decimalSeconds = getDecimalPart(minutes);
  return getSecondsFromMinutes(decimalSeconds);
}

export function getTravelDistanceInMeters(distance, units, unitTypes) {
  switch (units) {
    case unitTypes.MILES:
      return distance * METERS_PER_MILE;
    case unitTypes.KM:
      return distance * METERS_PER_KM;
    case unitTypes.METERS:
      return distance * METERS_AROUND_TRACK;
    default:
      throw new Error('Invalid unit type');
  }
}

export function getTravelDistanceInMiles(distance, units, unitTypes) {
  switch (units) {
    case unitTypes.MILES:
      return distance;
    case unitTypes.KM:
      return (distance * METERS_PER_KM) / METERS_PER_MILE;
    case unitTypes.METERS:
      return distance / METERS_PER_MILE;
    default:
      throw new Error(`Invalid unit type: ${units}`);
  }
}

export function getTravelDistanceInKilometers(distance, units, unitTypes) {
  switch (units) {
    case unitTypes.KM:
      return distance;
    case unitTypes.MILES:
      return (distance * METERS_PER_MILE) / METERS_PER_KM;
    case unitTypes.METERS:
      return distance / METERS_PER_KM;
    default:
      throw new Error('Invalid unit type');
  }
}

