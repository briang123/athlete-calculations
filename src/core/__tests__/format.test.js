import { formatter, FORMAT_PRESETS, daysFormatter, hoursFormatter, minutesFormatter, secondsFormatter } from '../format.js';

describe('Tests for the format functions', () => {
  it('should format days', () => {
    expect(daysFormatter(1)).toEqual({
      patterns: /(%D*([DLl]))/,
      tokens: {
        '%D': '1',
        '%DD': '01',
        '%DL': 'day',
        '%Dl': 'd'
      }
    });
    expect(daysFormatter(0)).toEqual({
      patterns: /(%D*([DLl]))/,
      tokens: {
        '%D': '0',
        '%DD': '00',
        '%DL': 'days',
        '%Dl': 'd'
      }
    });
    expect(daysFormatter(2)).toEqual({
      patterns: /(%D*([DLl]))/,
      tokens: {
        '%D': '2',
        '%DD': '02',
        '%DL': 'days',
        '%Dl': 'd'
      }
    });
  });


  it('should format hours', () => {
    expect(hoursFormatter(1)).toEqual({
      patterns: /(%H*([HLl]))/,
      tokens: {
        '%H': '1',
        '%HH': '01',
        '%HL': 'hour',
        '%Hl': 'hr'
      }
    });

    expect(hoursFormatter(0)).toEqual({
      patterns: /(%H*([HLl]))/,
      tokens: {
        '%H': '0',
        '%HH': '00',
        '%HL': 'hours',
        '%Hl': 'hrs'
      }
    });

    expect(hoursFormatter(2)).toEqual({
      patterns: /(%H*([HLl]))/,
      tokens: {     
        '%H': '2',
        '%HH': '02',
        '%HL': 'hours',
        '%Hl': 'hrs'
      }
    });
  });

  it('should format minutes', () => {
    expect(minutesFormatter(1)).toEqual({
      patterns: /(%M*([MLl]))/,
      tokens: { 
        '%M': '1',
        '%MM': '01',
        '%ML': 'minute',
        '%Ml': 'min'
      }
    });     

    expect(minutesFormatter(0)).toEqual({
      patterns: /(%M*([MLl]))/,
      tokens: {
        '%M': '0',
        '%MM': '00',
        '%ML': 'minutes',
        '%Ml': 'mins'
      }
    });

    expect(minutesFormatter(2)).toEqual({
      patterns: /(%M*([MLl]))/,
      tokens: {
        '%M': '2',
        '%MM': '02',
        '%ML': 'minutes',
        '%Ml': 'mins'
      }
    });
  });

  it('should format seconds', () => {
    expect(secondsFormatter(1)).toEqual({
      patterns: /(%S*([SLl]))/, 
      tokens: {
        '%S': '1',
        '%SS': '01',
        '%SL': 'second',
        '%Sl': 'sec'
      }
    });

    expect(secondsFormatter(0)).toEqual({
      patterns: /(%S*([SLl]))/,
      tokens: {
        '%S': '0',
        '%SS': '00',
        '%SL': 'seconds',
        '%Sl': 'secs'
      }
    }); 

    expect(secondsFormatter(2)).toEqual({
      patterns: /(%S*([SLl]))/,
      tokens: {
        '%S': '2',
        '%SS': '02',
        '%SL': 'seconds',
        '%Sl': 'secs'  
      }
    });
  });

  it('should format the format function', () => {
    expect(formatter({
      format: '%M:%SS',
      days: 1,
      hours: 2,
      minutes: 3,
      seconds: 4    
    })).toEqual('3:04');
  });

  it('should format the format function with a custom format DHMS-LLLL', () => {
    expect(formatter({
      format: 'DHMS-LLLL',         
      days: 1,
      hours: 2,
      minutes: 3,
      seconds: 4
    })).toEqual('1 day, 2 hours, 3 minutes, 4 seconds');   
    
  });

  it('should format the format function with a custom format DHMS-llll', () => {    
    expect(formatter({
      format: 'DHMS-llll',
      days: 1,
      hours: 2,
      minutes: 3,
      seconds: 4
    })).toEqual('1d, 2hrs, 3mins, 4secs');
  });

  it('should format the format function with a custom format HMMSS', () => {
    expect(formatter({
      format: 'HMMSS',
      hours: 1,
      minutes: 2,
      seconds: 3
    })).toEqual('1:02:03');
  });

  it('should format the format function with a custom format DHHMMSS-l', () => {
    expect(formatter({
      format: 'DHHMMSS-l',
      days: 1,
      hours: 2,
      minutes: 3,
      seconds: 4
    })).toEqual('1d:02:03:04');
  });
});
