// var TIME = 1;
// var DISTANCE = 2;
// var PACE = 3;
// var MILES = 0;
// var METERS = 1;
// var KILOMETERS = 2;
// var TRUE = 1;
// var FALSE = 0;

// function calcIT() {
//   min = document.Calc.timeM.value;
//   sec = document.Calc.timeS.value;
//   time = min * 1 + sec / 60;
//   distance = document.Calc.distance.value;
//   minP = document.Calc.paceM.value;
//   secP = document.Calc.paceS.value;
//   pace = minP * 1 + secP / 60;
//   result =
//     document.Calc.CalcWhat.options[document.Calc.CalcWhat.selectedIndex].value;
//   if (result == TIME) {
//     distConversion(TRUE);
//     paceConversion(TRUE);
//     time = distance * pace;
//     min = document.Calc.timeM.value = Math.floor(time);
//     document.Calc.timeS.value = Math.round(60 * (time - min));
//   } else if (result == DISTANCE) {
//     paceConversion(TRUE);
//     distance = time / pace;
//     distConversion(FALSE);
//     document.Calc.distance.value = decimalPlaces(distance, 2);
//   } else if (result == PACE) {
//     distConversion(TRUE);
//     pace = time / distance;
//     paceConversion(FALSE);
//     minP = Math.floor(pace);
//     secP = Math.round(60 * (pace - minP));
//     if (secP == 60) {
//       minP++;
//       secP = 0;
//     }
//     document.Calc.paceM.value = minP;
//     document.Calc.paceS.value = secP;
//   }
// }

// function distConversion(toMeters) {
//   if (document.Calc.optDist[MILES].checked) {
//     distance = toMeters ? distance * 1609 : distance / 1609;
//   } else if (document.Calc.optDist[METERS].checked) {
//   } else if (document.Calc.optDist[KILOMETERS].checked) {
//     distance = toMeters ? distance * 1000 : distance / 1000;
//   }
// }

// function paceConversion(toMeters) {
//   if (document.Calc.optPace[MILES].checked) {
//     pace = toMeters ? pace / 1609 : pace * 1609;
//   } else if (document.Calc.optPace[METERS].checked) {
//     pace = toMeters ? pace / 400 : pace * 400;
//   } else if (document.Calc.optPace[KILOMETERS].checked) {
//     pace = toMeters ? pace / 1000 : pace * 1000;
//   }
// }

// function decimalPlaces(val, places) {
//   factor = 1;
//   for (i = 0; i < places; i++) {
//     factor *= 10;
//   }
//   val *= factor;
//   val = Math.round(val);
//   val /= factor;
//   return val;
// }

// function checkCalc() {
//   choice = document.Calc.CalcWhat.selectedIndex;
//   if (choice == 0) {
//     alert(
//       'Please select what you would like to calculate:  time, distance, or pace.',
//     );
//   }
//   if (choice == 1) {
//     document.Calc.timeM.value = '';
//     document.Calc.timeS.value = '';
//     alert(
//       'To calculate your time, enter the distance traveled and your pace time per distance interval.',
//     );
//   }
//   if (choice == 2) {
//     document.Calc.distance.value = '';
//     alert(
//       'To calculate your distance, enter the time elapsed and your pace time per distance interval.',
//     );
//   }
//   if (choice == 3) {
//     document.Calc.paceM.value = '';
//     document.Calc.paceS.value = '';
//     alert(
//       'To calculate your pace, enter the time elapsed and the distance traveled.',
//     );
//   }
// }

const HOURS_PER_DAY = 24;
const MINUTES_PER_HOUR = 60;
const SECONDS_PER_MINUTE = 60;

function isNumber(v) {
  return typeof v === 'number';
}

function containZeroValues(arr) {
  return arr.some((v) => v === 0);
}

function areNonNegativeValues(arr) {
  return arr.every((v) => v >= 0);
}

function getDecimalPart(v) {
  return v % 1;
}
function getTotalSeconds(hours, minutes, seconds) {
  return (
    hours * MINUTES_PER_HOUR * SECONDS_PER_MINUTE +
    minutes * SECONDS_PER_MINUTE +
    seconds
  );
}

function getMinutesFromSeconds(seconds) {
  return seconds / SECONDS_PER_MINUTE;
}

function getSecondsFromMinutes(minutes) {
  return minutes * SECONDS_PER_MINUTE;
}
function getMinutePartFromMinutesAndSeconds(value) {
  return Math.floor(value);
}

function convertDecimalToSeconds(minutes) {
  const decimalSeconds = getDecimalPart(minutes);
  return getSecondsFromMinutes(decimalSeconds);
}

function doubleDigitize(v) {
  return v.toString().length === 1 ? `0${v}` : v.toString();
}

function getTimeParts(time) {
  //const totalMinutes = getMinutePartFromMinutesAndSeconds(time);
  const totalMinutes = Math.floor(time);
  const hours = Math.floor(totalMinutes / 60);
  const minutes = totalMinutes % 60;
  const seconds = convertDecimalToSeconds(time);

  const hh = doubleDigitize(hours);
  const mm = doubleDigitize(minutes);
  const ss = doubleDigitize(seconds);

  return { hours, minutes, seconds, formattedTime: `${hh}:${mm}:${ss}` };
}

function calculateMinutesPerMile({
  hours = 0,
  minutes = 0,
  seconds = 0,
  distance = 0,
  unit = 'mi',
} = {}) {
  if (
    !isNumber(hours) ||
    !isNumber(minutes) ||
    !isNumber(seconds) ||
    !isNumber(distance)
  ) {
    throw new Error(
      'Hours, minutes, seconds, and distance must be a valid number',
    );
  }

  if (containZeroValues([minutes, distance])) {
    throw new Error('Minutes and distance must be greater than 0');
  }

  if (!areNonNegativeValues([hours, minutes, seconds, distance])) {
    throw new Error('Negative values are not allowed');
  }

  const totalSeconds = getTotalSeconds(hours, minutes, seconds);
  const totalMinutes = getMinutesFromSeconds(totalSeconds);

  const imperialPace = totalMinutes * (1 / distance);
  const metricPace = totalMinutes * (1 / distance);

  const imperialTimeParts = getTimeParts(imperialPace);
  const metricTimeParts = getTimeParts(metricPace);
  return {
    pace: {
      ...imperialTimeParts,
    },
  };
}

module.exports = {
  calculateMinutesPerMile,
};
