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

| Tokens | Output                            | Available when Calculating... |
| :----- | :-------------------------------- | :---------------------------: |
| %DD    | double-digit day (ie. 01)         |          time, pace           |
| %D     | single-digit day (ie. 1)          |          time, pace           |
| %HH    | double-digit hour (ie. 01...24)   |          time, pace           |
| %H     | single-digit hour (ie. 1...24)    |          time, pace           |
| %MM    | double-digit minute (ie. 01...59) |          time, pace           |
| %M     | single-digit minute (ie. 1...59)  |          time, pace           |
| %SS    | double-digit second (ie. 01...59) |          time, pace           |
| %S     | single-digit second (ie. 1...59)  |          time, pace           |

### Presets

| Preset     | Tokens                         | Output                                | Available when Calculating... |
| :--------- | :----------------------------- | :------------------------------------ | :---------------------------: |
| DHMS-LLLL  | %D %DL, %H %HL, %M %ML, %S %SL | 1 day, 2 hours, 9 minutes, 34 seconds |          time, pace           |
| DMMSS-llll | %D%Dl, %H%Hl, %M%Ml, %S%Sl     | 1d, 2hrs, 9min, 34sec                 |          time, pace           |
| HMMSS      | %H:%MM:%SS                     | 2:09:34                               |          time, pace           |
| DHHMMSS-l  | %D%Dl:%HH:%MM:%SS              | 1d:02:09:25                           |          time, pace           |

## Calculate Pace

```js
import { DISTANCE_UNITS, PACE_UNITS, calculatePace } from 'athlete-calculations';

calculatePace({
	distance: { traveled: 3.1, units: DISTANCE_UNITS.MILES },
	time: { hours: 0, minutes: 20, seconds: 21, units: PACE_UNITS.MILES },
	format: '%M:%SS',
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

## Calculate Time

```js
import { DISTANCE_UNITS, PACE_UNITS, calculateTime } from 'athlete-calculations';

calculateTime({
	distance: { traveled: 3.1, units: DISTANCE_UNITS.MILES },
	pace: { hours: 0, minutes: 6, seconds: 34, units: PACE_UNITS.MILES },
	format: '%M:%SS',
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

## Calculate Distance

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

## Contributing

We welcome contributors to this package and ask that you're consistent with the coding style and attempt to keep the codebase DRY. Please report issues [here](https://github.com/briang123/athlete-calculations/issues).

## License

[MIT @ Brian Gaines](https://github.com/briang123/athlete-calculations/blob/main/LICENSE)
