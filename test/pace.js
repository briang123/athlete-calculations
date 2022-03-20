import {
  calculatePace,
  DISTANCE_UNITS,
  PACE_UNITS,
  fake5kRaceResults,
} from 'athlete-calculations';

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

//fixme: Notice there is a 1 second difference in pace when calculating miles vs. km
const p = pace();
console.log(
  p.message({ traveled: 3.1, units: DISTANCE_UNITS.MILES }),
  p.calculate({
    distance: { traveled: 3.1, units: DISTANCE_UNITS.MILES },
    time: { hours: 0, minutes: 20, seconds: 21, units: PACE_UNITS.MILES },
    format: '%M:%SS',
  }),
);

console.log(
  p.message({ traveled: 5, units: DISTANCE_UNITS.KM }),
  p.calculate({
    distance: { traveled: 5, units: DISTANCE_UNITS.KM },
    time: { hours: 0, minutes: 20, seconds: 21, units: PACE_UNITS.MILES },
    format: '%M:%SS',
  }),
);

//----------------------------------------------------------------
// calculating pace in race results

// function fakeData() {
//   return {
//     fetch: () => fake5kRaceResults(),
//   };
// }

// const faker = fakeData();
// const fakeResults = faker.fetch();

// console.log(
//   'Calculate pace and append to race results',
//   JSON.stringify(p.processResults(fakeResults), null, 2),
// );
