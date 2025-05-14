import { doubleDigitize, pluralize } from '../utils/common.js';
import {
  patternBasedMerger,
  getValueFromJsonIfExists,
  mergeTokenPatterns,
} from '../utils/merge.js';

export const FORMAT_PRESETS = {
  'DHMS-LLLL': '%D %DL, %H %HL, %M %ML, %S %SL',
  'DHMS-llll': '%D%Dl, %H%Hl, %M%Ml, %S%Sl',
  'HMMSS': '%H:%MM:%SS',
  'DHHMMSS-l': '%D%Dl:%HH:%MM:%SS',
};

export function daysFormatter(value) {
  return {
    patterns: /(%D*([DLl]))/,
    tokens: {
      '%DD': doubleDigitize(value),
      '%D': `${value}`,
      '%Dl': 'd',
      '%DL': pluralize('day', value, 's'),
    },
  };
}

export function hoursFormatter(value) {
  return {
    patterns: /(%H*([HLl]))/,
    tokens: {
      '%HH': doubleDigitize(value),
      '%H': `${value}`,
      '%Hl': pluralize('hr', value, 's'),
      '%HL': pluralize('hour', value, 's'),
    },
  };
}

export function minutesFormatter(value) {
  return {
    patterns: /(%M*([MLl]))/,
    tokens: {
      '%MM': doubleDigitize(value),
      '%M': `${value}`,
      '%Ml': pluralize('min', value, 's'),
      '%ML': pluralize('minute', value, 's'),
    },
  };
}

export function secondsFormatter(value) {
  return {
    patterns: /(%S*([SLl]))/,
    tokens: {
      '%SS': doubleDigitize(value),
      '%S': `${value}`,
      '%Sl': pluralize('sec', value, 's'),
      '%SL': pluralize('second', value, 's'),
    },
  };
}

export function formatter({ format, days, hours, minutes, seconds }) {
  const D = daysFormatter(days);
  const H = hoursFormatter(hours);
  const M = minutesFormatter(minutes);
  const S = secondsFormatter(seconds);

  const patterns = mergeTokenPatterns([
    D.patterns,
    H.patterns,
    M.patterns,
    S.patterns,
  ]);
  const tokens = { ...D.tokens, ...H.tokens, ...M.tokens, ...S.tokens };
  const _format = getValueFromJsonIfExists(format, FORMAT_PRESETS);
  return patternBasedMerger({ format: _format, patterns, tokens });
}
