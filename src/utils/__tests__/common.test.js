import { isString } from './../common.js';

describe.skip('Tests for the common functions', () => {
  it('Should assert that isString is a string', () => {
    expect(isString('Happy')).toBe(true);
    expect(isString('')).toBe(true);

    expect(isString(null)).toBe(false);
    expect(isString()).toBe(false);
    expect(isString(1)).toBe(false);
  });
});
