import { isString, isNumber, isOne, exists, round, doubleDigitize, pluralize } from './../common.js';

describe('Tests for the common functions', () => {
  it('Should assert that isString is a string', () => {
    expect(isString('Happy')).toBe(true);
    expect(isString('')).toBe(true);

    expect(isString(null)).toBe(false);
    expect(isString()).toBe(false);
    expect(isString(1)).toBe(false);
  });

  it('should assert that isNumber is a number', () => {
    expect(isNumber(1)).toBe(true);
    expect(isNumber(1.1)).toBe(true);
    expect(isNumber(0)).toBe(true);
  });

  it('should assert that isOne is a one', () => {
    expect(isOne(1)).toBe(true);
    expect(isOne(1.1)).toBe(false);
    expect(isOne(0)).toBe(false);
    expect(isOne(-1)).toBe(true);
    expect(isOne(['a','b'])).toBe(false);
    expect(isOne('abc')).toBe(false);
    expect(isOne('a')).toBe(true);
    expect(isOne(undefined)).toBe(false);
    expect(isOne()).toBe(false);
  });

  it('should assert that exists is a exists', () => {
    expect(exists(1)).toBe(true);
    expect(exists(1.1)).toBe(true);
    expect(exists(0)).toBe(true);
  });
  
  it('should assert that round is a round', () => {
    expect(round(1.1, 0)).toBe(1);
    expect(round(1.1, 1)).toBe(1.1);
    expect(round(1.1, 2)).toBe(1.1);
  });

  it('should assert that doubleDigitize is a doubleDigitize', () => {
    expect(doubleDigitize(1)).toBe('01');
    expect(doubleDigitize(-1)).toBe('-1');
    expect(doubleDigitize(1.1)).toBe('1.1');
  });

  it('should assert that pluralize is a pluralize', () => {
    expect(pluralize('car', 1, 's')).toBe('car');
    expect(pluralize('car', 2, 's')).toBe('cars');
    expect(pluralize('car', 0, 's')).toBe('cars');
    expect(pluralize('car', 1.1, 's')).toBe('cars');
    expect(pluralize('car', -1, 's')).toBe('car');
  });
});

