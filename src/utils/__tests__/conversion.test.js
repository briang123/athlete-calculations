import { getDecimalPart } from '../conversion.js';

describe.skip('Tests for the conversion functions', () => {
  it('Should assert that getDecimalPart returns the value after the decimal point', () => {
    expect(getDecimalPart(1.2, 1)).toEqual(0.2);
    expect(getDecimalPart(1.23456, 2)).toEqual(0.23);
    expect(getDecimalPart(1.23456, 3)).toEqual(0.235);
    expect(getDecimalPart(1.23456, 4)).toEqual(0.2346);
    expect(getDecimalPart(1.23456, 5)).toEqual(0.23456);
    expect(getDecimalPart(1.23456, 6)).toEqual(0.23456);
  });
});
