import { exists } from './common.js';

export function mergeTokenPatterns(patterns) {
  return new RegExp(patterns.map((x) => x.source).join('|'), 'g');
}

export function patternMatcher(match, sequence) {
  const patternIndex = sequence.indexOf(match);
  return exists(patternIndex) ? sequence[patternIndex + 1] : match;
}

export function sequencer(json = {}) {
  return [...new Set(Object.entries(json))].flat();
}

export function merger({ format, tokens }) {
  const sequenced = sequencer(tokens);
  return mergeText(format, sequenced);
}

export function mergeText(text, sequence = []) {
  const replacements = {};
  for (let i = 0; i < sequence.length; i += 2) {
    replacements[sequence[i]] = sequence[i + 1];
  }

  return text.replace(/\{[^}]+\}/g, (match) => {
    return match in replacements ? replacements[match] : match;
  });
}

// export function _merger({ format, pattern, tokens }) {
//   const sequenced = sequencer(tokens);
//   return _mergeText(format, pattern, sequenced);
// }

// export function _mergeText(text, pattern, sequence = []) {
//   return text.replace(pattern, (match) => patternMatcher(match, sequence));
// }

export function getValueFromJsonIfExists(value, json) {
  const sequence = sequencer(json);
  const index = sequence.findIndex((v) => v === value);
  return exists(index) ? sequence[index + 1] : value;
}

