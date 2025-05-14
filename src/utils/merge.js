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

export function tokenBasedMerger({ format, tokens }) {
  const sequenced = sequencer(tokens);
  return tokenBasedMergeText(format, sequenced);
}

export function tokenBasedMergeText(text, sequence = []) {
  const replacements = {};
  for (let i = 0; i < sequence.length; i += 2) {
    replacements[sequence[i]] = sequence[i + 1];
  }

  return text.replace(/\{[^}]+\}/g, (match) => {
    return match in replacements ? replacements[match] : match;
  });
}

export function patternBasedMerger({format, patterns, tokens}) {
  return patternBasedMergeText(format, patterns, tokens);
}

export function patternBasedMergeText(text, pattern, tokens) {
  return text.replace(pattern, (match) => {
    return tokens[match] || match;
  });
}

export function getValueFromJsonIfExists(value, json) {
  const sequence = sequencer(json);
  const index = sequence.findIndex((v) => v === value);
  return exists(index) ? sequence[index + 1] : value;
}

