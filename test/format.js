const {
  pluralize,
  merger,
  doubleDigitize,
  mergeTokenPatterns,
  getValueFromJsonIfExists,
} = require('./core');

const FORMAT_PRESETS = {
  'DHMS-LLLL': '%D %DL, %HH %HL, %M %ML, %S %SL',
  'DHMS-llll': '%D%Dl, %H%Hl, %M%Ml, %S%Sl',
  HMMSS: '%H:%MM:%SS',
  'DHMS-Dl': '%D%Dl:%H:%M:%S',
};

function daysFormatter(value) {
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

function hoursFormatter(value) {
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

function minutesFormatter(value) {
  return {
    patterns: /(%M*([MLl]))/,
    tokens: {
      '%MM': doubleDigitize(value),
      '%M': `${value}`,
      '%Ml': 'min',
      '%ML': pluralize('minute', value, 's'),
    },
  };
}

function secondsFormatter(value) {
  return {
    patterns: /(%S*([SLl]))/,
    tokens: {
      '%SS': doubleDigitize(value),
      '%S': `${value}`,
      '%Sl': 'sec',
      '%SL': pluralize('second', value, 's'),
    },
  };
}

function formatter({ format, days, hours, minutes, seconds }) {
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
  return merger({ format: _format, patterns, tokens });
}

module.exports = {
  FORMAT_PRESETS,
  formatter,
};
