export function isNumber(value) {
  return typeof value === 'number';
}

export function isString(value) {
  return typeof value === 'string';
}

export function exists(index) {
  return index > -1;
}

export function round(value, places) {
  const x = Math.pow(10, places);
  return Math.round(value * x) / x;
}

export function isOne(value) {
  if (isNumber(value)) return value === 1 || value === -1;
  if (isString(value)) return value?.length === 1;
  if (Array.isArray(value)) return value.length === 1;
  return false;
}

export function doubleDigitize(value) {
  const strValue = value?.toString();
  return isOne(strValue) ? `0${value}` : strValue;
}

export function pluralize(word, count, ending) {
  return `${word}${isOne(count) ? '' : ending}`;
}
