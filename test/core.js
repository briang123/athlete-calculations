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

function patternMatcher(match, sequence) {
  const patternIndex = sequence.indexOf(match);
  return exists(patternIndex) ? sequence[patternIndex + 1] : match;
}

function mergeText(text, pattern, sequence = []) {
  return text.replace(pattern, (match) => patternMatcher(match, sequence));
}

function sequencer(json = {}) {
  return [...new Set(Object.entries(json))].flat();
}

function merger({ format, patterns, tokens }) {
  const sequenced = sequencer(tokens);
  return mergeText(format, patterns, sequenced);
}

function mergeTokenPatterns(patterns) {
  return new RegExp(patterns.map((x) => x.source).join('|'), 'g');
}

function getValueFromJsonIfExists(value, json) {
  const sequence = sequencer(json);
  const index = sequence.findIndex((v) => v === value);
  return exists(index) ? sequence[index + 1] : value;
}

function getDecimalPart(value) {
  return value % 1;
}

module.exports = {
  doubleDigitize,
  exists,
  getDecimalPart,
  getValueFromJsonIfExists,
  isNumber,
  isOne,
  isString,
  merger,
  mergeText,
  mergeTokenPatterns,
  pluralize,
  round,
};
