function isNumber(value) {
  return typeof value === 'number';
}

function isString(value) {
  return typeof value === 'string';
}

function exists(index) {
  return index > -1;
}

function round(value, places) {
  const x = Math.pow(10, places);
  return Math.round(value * x) / x;
}

function isOne(value) {
  if (isNumber(value)) return value === 1;
  if (isString(value)) return value?.length === 1;
  if (Array.isArray(value)) return value.length === 1;
  return false;
}

function doubleDigitize(value) {
  const strValue = value?.toString();
  return isOne(strValue) ? `0${value}` : strValue;
}

function pluralize(word, count, ending) {
  return `${word}${isOne(count) ? '' : ending}`;
}

module.exports = {
  isNumber,
  isString,
  exists,
  round,
  isOne,
  doubleDigitize,
  pluralize,
};
