import {
  calculateTime,
  calculatePace,
  calculateDistance,
  DISTANCE_UNITS,
  PACE_UNITS,
  fake5kRaceResults,
} from 'athlete-calculations';

function fakeData() {
  return {
    fetch: () => fake5kRaceResults,
  };
}

function time() {
  return {
    message: 'Calculating time from distance and pace',
    calculate: ({ distance, pace, format }) =>
      calculateTime({ distance, pace, format }),
  };
}

function pace() {
  let _message = `Calculating pace from time and distance of {traveled} {units}`;
  return {
    message: ({ traveled, units }) =>
      _message.replace('{traveled}', traveled).replace('{units}', units),
    calculate: ({ distance, time, format }) =>
      calculatePace({
        distance,
        time,
        format,
      }),
    processResults: (data) =>
      data.map((resultItem) => {
        const { distance, units, hours, minutes, seconds } = resultItem;
        return {
          ...resultItem,
          pace: calculatePace({
            distance: { traveled: distance, units },
            time: {
              hours,
              minutes,
              seconds,
              units,
            },
            format: '%M:%SS',
          }).pace.formatted,
        };
      }),
  };
}

function distance() {
  return {
    message: 'Calculating distance from time and pace',
    calculate: ({ distance, time, pace }) =>
      calculateDistance({
        distance,
        time,
        pace,
      }),
  };
}

//==============================================================================
//TESTING TOTAL TIME
const t = time();
console.log(
  t.message,
  t.calculate({
    distance: { traveled: 3.1, units: 'TEST' },
    pace: { hours: 1, minutes: 6, seconds: 34, units: PACE_UNITS.MILES },
    format: '%M:%SS',
  }),
);

//==============================================================================
//TESTING DISTANCE
// const d = distance();
// console.log(
//   d.message,
//   d.calculate({
//     distance: { units: DISTANCE_UNITS.MILES },
//     time: { hours: 0, minutes: 20, seconds: 21 },
//     pace: { hours: 0, minutes: 6, seconds: 34, units: PACE_UNITS.MILES },
//   }),
// );

//==============================================================================
// TESTING PACE
//fixme: Notice there is a 1 second difference in pace when calculating miles vs. km
// const p = pace();
// console.log(
//   p.message({ traveled: 3.1, units: DISTANCE_UNITS.MILES }),
//   p.calculate({
//     distance: { traveled: 3.1, units: DISTANCE_UNITS.MILES },
//     time: { hours: 0, minutes: 20, seconds: 21, units: PACE_UNITS.MILES },
//     format: '%M:%SS',
//   }),
// );

// console.log(
//   p.message({ traveled: 5, units: DISTANCE_UNITS.KM }),
//   p.calculate({
//     distance: { traveled: 5, units: DISTANCE_UNITS.KM },
//     time: { hours: 0, minutes: 20, seconds: 21, units: PACE_UNITS.MILES },
//     format: '%M:%SS',
//   }),
// );

// const faker = fakeData();
// const fakeResults = faker.fetch();
// console.log(
//   'Calculate pace and append to race results',
//   JSON.stringify(p.processResults(fakeResults), null, 2),
// );
