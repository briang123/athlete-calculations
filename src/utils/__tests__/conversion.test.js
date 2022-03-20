import { getDecimalPart, getTimeParts, getMinutesFromHMS } from '../conversion.js';
import {
  HOURS_PER_DAY,
  MINUTES_PER_HOUR,
  SECONDS_PER_MINUTE,
} from '../../core/constants';

describe('Tests for the conversion functions', () => {
  it.skip('Should assert that getDecimalPart returns the value after the decimal point', () => {
    expect(getDecimalPart(1.2, 1)).toEqual(0.2);
    expect(getDecimalPart(1.23456, 2)).toEqual(0.23);
    expect(getDecimalPart(1.23456, 3)).toEqual(0.235);
    expect(getDecimalPart(1.23456, 4)).toEqual(0.2346);
    expect(getDecimalPart(1.23456, 5)).toEqual(0.23456);
    expect(getDecimalPart(1.23456, 6)).toEqual(0.23456);
  });

  it('Should assert that we get hours, minutes, and seconds from total minutes', () => {
    //1 hr 23min 45sec
    const time = '31:23:45';
    const _h = Number(time.split(':')[0]);
    const _m = Number(time.split(':')[1]);
    const _s = Number(time.split(':')[2]);
  
    const totalMinutes = getMinutesFromHMS(_h, _m, _s);

    const result = getTimeParts(totalMinutes);
    console.log(result);
  });
});
