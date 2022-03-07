import { exists } from './common.js';

export function mergeTokenPatterns(patterns) {
  return new RegExp(patterns.map((x) => x.source).join('|'), 'g');
}

function patternMatcher(match, sequence) {
  const patternIndex = sequence.indexOf(match);
  return exists(patternIndex) ? sequence[patternIndex + 1] : match;
}

function sequencer(json = {}) {
  return [...new Set(Object.entries(json))].flat();
}

export function merger({ format, patterns, tokens }) {
  const sequenced = sequencer(tokens);
  return mergeText(format, patterns, sequenced);
}

export function mergeText(text, pattern, sequence = []) {
  return text.replace(pattern, (match) => patternMatcher(match, sequence));
}

export function getValueFromJsonIfExists(value, json) {
  const sequence = sequencer(json);
  const index = sequence.findIndex((v) => v === value);
  return exists(index) ? sequence[index + 1] : value;
}

