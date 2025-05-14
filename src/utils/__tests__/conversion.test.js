import {
  getTimeParts,
  getDecimalPart,
  getMinutesFromSeconds,
  getSecondsFromMinutes,
  getHoursFromMinutes,
  getHours,
  getMinutesIntoHour,
  getMinutesFromHMS,
  getTotalTimeTraveled,
  getDaysFromHours,
  getTotalMinutesFromTime,
  convertDecimalToSeconds,
  getTravelDistanceInMeters,
  getTravelDistanceInMiles,
  getTravelDistanceInKilometers
} from '../conversion.js';
import { DISTANCE_UNITS } from '../../core/constants.js';

describe('Time Conversion Functions', () => {
  describe('getTimeParts', () => {
    it('should convert minutes to days, hours, minutes, seconds', () => {
      const result = getTimeParts(1500); // 25 hours
      expect(result).toEqual({
        days: 1,
        hours: 1,
        minutes: 0,
        seconds: 0
      });
    });

    it('should handle decimal minutes', () => {
      const result = getTimeParts(61.5); // 1 hour, 1 minute, 30 seconds
      expect(result).toEqual({
        days: 0,
        hours: 1,
        minutes: 1,
        seconds: 30
      });
    });
  });

  describe('getDecimalPart', () => {
    it('should extract decimal part of a number', () => {
      expect(getDecimalPart(5.75, 2)).toBe(0.75);
      expect(getDecimalPart(10.25)).toBe(0.25);
    });

    it('should handle negative numbers', () => {
      expect(getDecimalPart(-5.75, 2)).toBe(-0.75);
    });
  });

  describe('getMinutesFromSeconds', () => {
    it('should convert seconds to minutes', () => {
      expect(getMinutesFromSeconds(90)).toBe(1.5);
      expect(getMinutesFromSeconds(60)).toBe(1);
    });
  });

  describe('getSecondsFromMinutes', () => {
    it('should convert minutes to seconds', () => {
      expect(getSecondsFromMinutes(1.5)).toBe(90);
      expect(getSecondsFromMinutes(1)).toBe(60);
    });
  });

  describe('getHoursFromMinutes', () => {
    it('should convert minutes to hours', () => {
      expect(getHoursFromMinutes(90)).toBe(1);
      expect(getHoursFromMinutes(60)).toBe(1);
      expect(getHoursFromMinutes(150)).toBe(2);
    });
  });

  describe('getHours', () => {
    it('should calculate remaining hours after days', () => {
      expect(getHours(1, 25)).toBe(1); // 25 hours = 1 day + 1 hour
      expect(getHours(0, 5)).toBe(5); // 5 hours = 0 days + 5 hours
    });
  });

  describe('getMinutesIntoHour', () => {
    it('should get remaining minutes in the current hour', () => {
      expect(getMinutesIntoHour(90)).toBe(30); // 1 hour 30 minutes
      expect(getMinutesIntoHour(45)).toBe(45); // 45 minutes
    });
  });

  describe('getMinutesFromHMS', () => {
    it('should convert hours, minutes, seconds to total minutes', () => {
      expect(getMinutesFromHMS(1, 30, 0)).toBe(90); // 1 hour 30 minutes
      expect(getMinutesFromHMS(0, 45, 30)).toBe(45.5); // 45 minutes 30 seconds
    });
  });

  describe('getTotalTimeTraveled', () => {
    it('should calculate total time from distance and pace', () => {
      expect(getTotalTimeTraveled(5, 6)).toBe(30); // 5 miles at 6 min/mile
      expect(getTotalTimeTraveled(10, 7.5)).toBe(75); // 10 miles at 7:30 min/mile
    });
  });

  describe('getDaysFromHours', () => {
    it('should convert hours to days', () => {
      expect(getDaysFromHours(24)).toBe(1);
      expect(getDaysFromHours(48)).toBe(2);
      expect(getDaysFromHours(12)).toBe(0);
    });
  });

  describe('getTotalMinutesFromTime', () => {
    it('should get total minutes from time', () => {
      expect(getTotalMinutesFromTime(90.75)).toBe(90);
      expect(getTotalMinutesFromTime(45.25)).toBe(45);
    });
  });

  describe('convertDecimalToSeconds', () => {
    it('should convert decimal minutes to seconds', () => {
      expect(convertDecimalToSeconds(1.5)).toBe(30); // 0.5 minutes = 30 seconds
      expect(convertDecimalToSeconds(2.25)).toBe(15); // 0.25 minutes = 15 seconds
    });
  });

  describe('getTravelDistanceInMeters', () => {
    it('should convert miles to meters', () => {
      expect(getTravelDistanceInMeters(1, DISTANCE_UNITS.MILES, DISTANCE_UNITS)).toBe(1609.34);
      expect(getTravelDistanceInMeters(5, DISTANCE_UNITS.MILES, DISTANCE_UNITS)).toBeCloseTo(8046.7, 1);
    });
  
    it('should convert kilometers to meters', () => {
      expect(getTravelDistanceInMeters(1, DISTANCE_UNITS.KM, DISTANCE_UNITS)).toBe(1000);
      expect(getTravelDistanceInMeters(5, DISTANCE_UNITS.KM, DISTANCE_UNITS)).toBe(5000);
    });
  
    it('should throw error for invalid unit type', () => {
      expect(() => getTravelDistanceInMeters(1, 'invalid', DISTANCE_UNITS)).toThrow('Invalid unit type');
    });
  });

  describe('getTravelDistanceInMiles', () => {
    it('should convert miles to miles', () => {
      expect(getTravelDistanceInMiles(1, DISTANCE_UNITS.MILES, DISTANCE_UNITS)).toBe(1);
      expect(getTravelDistanceInMiles(5, DISTANCE_UNITS.MILES, DISTANCE_UNITS)).toBe(5);
    });
  
    it('should convert kilometers to miles', () => {
      expect(getTravelDistanceInMiles(1, DISTANCE_UNITS.KM, DISTANCE_UNITS)).toBeCloseTo(0.621371, 5);
      expect(getTravelDistanceInMiles(5, DISTANCE_UNITS.KM, DISTANCE_UNITS)).toBeCloseTo(3.10686, 5);
    });
  
    it('should throw error for invalid unit type', () => {
      expect(() => getTravelDistanceInMiles(1, 'invalid', DISTANCE_UNITS)).toThrow('Invalid unit type');
    });
  });
  
  describe('getTravelDistanceInKilometers', () => {
    it('should convert kilometers to kilometers', () => {
      expect(getTravelDistanceInKilometers(1, DISTANCE_UNITS.KM, DISTANCE_UNITS)).toBe(1);
      expect(getTravelDistanceInKilometers(5, DISTANCE_UNITS.KM, DISTANCE_UNITS)).toBe(5);
    });
  
    it('should convert miles to kilometers', () => {
      expect(getTravelDistanceInKilometers(1, DISTANCE_UNITS.MILES, DISTANCE_UNITS)).toBeCloseTo(1.60934, 5);
      expect(getTravelDistanceInKilometers(5, DISTANCE_UNITS.MILES, DISTANCE_UNITS)).toBeCloseTo(8.0467, 4);
    });
  
    it('should throw error for invalid unit type', () => {
      expect(() => getTravelDistanceInKilometers(1, 'invalid', DISTANCE_UNITS)).toThrow('Invalid unit type');
    });
  });
  
  
  
  
  
});
