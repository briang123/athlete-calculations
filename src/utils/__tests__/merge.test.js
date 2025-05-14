import { getValueFromJsonIfExists, mergeTokenPatterns, tokenBasedMergeText, tokenBasedMerger, sequencer, patternMatcher } from '../merge.js';

describe('Tests for the merge functions', () => {

  it('should sequencer', () => {
    const json = { name: 'John', age: 30 };
    const sequenced = sequencer(json);
    expect(sequenced).toEqual(['name', 'John', 'age', 30]);
  });

  it('should merge text based on tokens', () => {
    const text = 'Hello {name}';
    const mergedText = tokenBasedMergeText(text, ['{name}', 'John']);
    expect(mergedText).toEqual('Hello John');
  });

  it('should merge text with multiple tokens', () => {
    const text = 'Hello {name} and {age}';
    const mergedText = tokenBasedMergeText(text, ['{name}', 'John', '{age}', 30]);
    expect(mergedText).toEqual('Hello John and 30');
  });

  it('should get value from json if exists', () => {
    const json = { name: 'John', age: 30 };
    const value = getValueFromJsonIfExists('name', json);
    expect(value).toEqual('John');
  });

  it('should merge token patterns', () => {
    const patterns = [/\{name\}/, /\{age\}/];
    const mergedPatterns = mergeTokenPatterns(patterns);
    expect(mergedPatterns).toEqual(/\{name\}|\{age\}/g);
  });

  it('should merge token based', () => {
    const format = 'Hello {name}, are you {age} years old?';
    const tokens = { '{name}': 'John', '{age}': 30 };
    const merged = tokenBasedMerger({ format, tokens });
    expect(merged).toEqual('Hello John, are you 30 years old?');
  });

  it('should pattern matcher', () => {
    const sequence = ['name', 'John', 'age', 30];
    const matched1 = patternMatcher('name', sequence);
    expect(matched1).toEqual('John');

    const matched2 = patternMatcher('age', sequence);
    expect(matched2).toEqual(30);
  });
  
});
