import { calculateDistanceFromTimeAndPace } from '../distance.js';

describe('calculateDistanceFromTimeAndPace', () => {
  it('should calculate distance correctly for a 5K pace', () => {
    const result = calculateDistanceFromTimeAndPace({
      distance: { traveled: 3.1, units: 'miles' },
      time: { hours: 0, minutes: 20, seconds: 0 },
      pace: { hours: 0, minutes: 6, seconds: 26, units: 'miles' }
    });

    expect(result.distance.traveled).toBe(3.11); // 5K in miles
    expect(result.distance.traveledShort).toBe(3.1); // 5K in miles
    expect(result.distance.units).toBe('miles');
    expect(result.time).toBe('0:20:0');
    expect(result.pace).toBe('0:6:26 miles');
  });

  it('should calculate distance correctly for a marathon pace', () => {
    const result = calculateDistanceFromTimeAndPace({
      distance: { traveled: 26.2, units: 'miles' },
      time: { hours: 4, minutes: 0, seconds: 0 },
      pace: { hours: 0, minutes: 9, seconds: 10, units: 'miles' }
    });

    expect(result.distance.traveled).toBe(26.18); // Marathon distance
    expect(result.distance.traveledShort).toBe(26.2); // Marathon distance
    expect(result.distance.units).toBe('miles');
    expect(result.time).toBe('4:0:0');
    expect(result.pace).toBe('0:9:10 miles');
  });

  it('should handle decimal paces correctly', () => {
    const result = calculateDistanceFromTimeAndPace({
      distance: { traveled: 8, units: 'miles' },
      time: { hours: 1, minutes: 0, seconds: 0 },
      pace: { hours: 0, minutes: 7, seconds: 30, units: 'miles' }
    });

    expect(result.distance.traveled).toBe(8); // 8 miles at 7:30 pace
    expect(result.distance.units).toBe('miles');
    expect(result.time).toBe('1:0:0');
    expect(result.pace).toBe('0:7:30 miles');
  });

  it('should handle different units', () => {
    const result = calculateDistanceFromTimeAndPace({
      distance: { traveled: 5, units: 'kilometers' },
      time: { hours: 0, minutes: 30, seconds: 0 },
      pace: { hours: 0, minutes: 6, seconds: 0, units: 'kilometers' }
    });

    expect(result.distance.traveled).toBe(5); // 5 kilometers
    expect(result.distance.units).toBe('kilometers');
    expect(result.time).toBe('0:30:0');
    expect(result.pace).toBe('0:6:0 kilometers');
  });
});

