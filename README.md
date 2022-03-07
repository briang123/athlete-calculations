# athlete-calculations

## Overview

An NPM package that contains a variety of useful functions for the athlete and endurance activity.

## Getting Started

https://github.com/briang123/athlete-calculations

```
npm install athlete-calculations
```

## Formats

### Tokens

**The following format tokens are only available when calculating time or pace at this time.**

| Input | Example | Description      |
| :---- | :------ | :--------------- |
| %DD   | 01      | Days, 2-digit    |
| %D    | 1       | Days             |
| %HH   | 00-23   | Hours, 2-digit   |
| %H    | 0-23    | Hours            |
| %MM   | 00-59   | Minutes, 2-digit |
| %M    | 0-59    | Minutes          |
| %SS   | 00-59   | Seconds, 2-digit |
| %S    | 1-59    | Seconds          |

### Presets

**The following formatting presets are only available when calculating time or pace at this time.**

| Input     | Tokens                         | Example                               | Description                                                              |
| :-------- | :----------------------------- | :------------------------------------ | :----------------------------------------------------------------------- |
| DHMS-LLLL | %D %DL, %H %HL, %M %ML, %S %SL | 1 day, 2 hours, 9 minutes, 34 seconds | Long output of Days, Hours, Minutes, and Seconds                         |
| DHMS-llll | %D%Dl, %H%Hl, %M%Ml, %S%Sl     | 1d, 2hrs, 9min, 34sec                 | Short output of Days, Hours, Minutes, and Seconds                        |
| HMMSS     | %H:%MM:%SS                     | 2:09:34                               | Hour, Minutes (2-digit), Seconds (2-digit)                               |
| DHHMMSS-l | %D%Dl:%HH:%MM:%SS              | 1d:02:09:25                           | Short output of Days along with double-digit Hours, Minutes, and Seconds |

## Pace Calculator

### Calculate Pace

We can **calculate pace** from **time** and **distance**

```js
import { DISTANCE_UNITS, PACE_UNITS, calculatePace } from 'athlete-calculations';

calculatePace({
	distance: { traveled: 3.1, units: DISTANCE_UNITS.MILES },
	time: { hours: 0, minutes: 20, seconds: 21, units: PACE_UNITS.MILES },
	format: '%M:%SS', // ie. 'HMMSS' => '0:06:34' (using a preset)
})

// result
{
  "distance": "3.1 miles",
  "time": "0:20:21",
  "totalTime": {
    "days": 0,
    "hours": 0,
    "minutes": 6,
    "seconds": 34,
    "formatted": "6:34"
  }
}
```

### Calculate Time

We can **calculate time** from **distance** and **pace**

```js
import { DISTANCE_UNITS, PACE_UNITS, calculateTime } from 'athlete-calculations';

calculateTime({
	distance: { traveled: 3.1, units: DISTANCE_UNITS.MILES },
	pace: { hours: 0, minutes: 6, seconds: 34, units: PACE_UNITS.MILES },
	format: '%M:%SS', // ie. 'HMMSS' => '0:20:21' (using a preset)
});


// result
{
  "distance": "3.1 miles",
  "pace": "0:6:34",
  "totalTime": {
    "days": 0,
    "hours": 0,
    "minutes": 20,
    "seconds": 21,
    "formatted": "20:21"
  }
}
```

### Calculate Distance

We can **calculate distance** from **time** and **pace**

> NOTE: Currently, presets are not supported when calculating for distance.

```js
import { DISTANCE_UNITS, PACE_UNITS, calculateDistance } from 'athlete-calculations';

calculateDistance({
	distance: { units: DISTANCE_UNITS.MILES },
	time: { hours: 0, minutes: 20, seconds: 21 },
	pace: { hours: 0, minutes: 6, seconds: 34, units: PACE_UNITS.MILES },
})

// results
{
  "time": "0:20:21",
  "pace": "0:6:34 miles",
  "totalDistance": {
    "distance": 3.1,
    "units": "miles"
  }
}
```

## Fake Race Results Data API

The API provides you with an array of 30 race results you can use. The results data is came from a real race, but the names were replaced with random names from a random name generator. We also took the liberty of parsing the hours, minutes, and seconds from the result race results to make it easier to get at the individual time parts.

```js
import { fake5kRaceResults } from 'athlete-calculations';

// A list of 30 race results
[
  {
    Bib: '1',
    Distance: '3.1',
    Hours: '0',
    Minutes: '20',
    Name: 'Tiffany Carter',
    Results: '0:20:16',
    Seconds: '16',
    Units: 'Miles',
  },
  {
    Bib: '2',
    Distance: '3.1',
    Hours: '0',
    Minutes: '21',
    Name: 'Hamza Cohen',
    Results: '0:21:56',
    Seconds: '56',
    Units: 'Miles',
  },
  //... removed for brevity
  {
    Bib: '30',
    Distance: '3.1',
    Hours: '0',
    Minutes: '29',
    Name: 'Paxton Weber',
    Results: '0:29:01',
    Seconds: '1',
    Units: 'Miles',
  },
];
```

## Contributing

We welcome contributors to this package and ask that you're consistent with the coding style and attempt to keep the codebase DRY. Please report issues [here](https://github.com/briang123/athlete-calculations/issues).

## License

[MIT @ Brian Gaines](https://github.com/briang123/athlete-calculations/blob/main/LICENSE)
