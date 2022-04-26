import { test, expect } from '@jest/globals';
import { genDiff, readFile } from '../src/diffFunc.js';

test('correct functioning', () => {
  const expected = readFile('expectedResult.txt');
  expect(genDiff('file1.json', 'file2.json')).toEqual(expected);
});
