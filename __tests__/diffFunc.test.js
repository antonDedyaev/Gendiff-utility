import { test, expect } from '@jest/globals';
import genDiff from '../src/diffFunc.js';
import { readFile } from '../utils/parsers.js';

const expectedNested = readFile('referenceNested.txt');

test('compare nested JSON files', () => {
  expect(genDiff('file1.json', 'file2.json')).toEqual(expectedNested);
});

test('compare nested YAML files', () => {
  expect(genDiff('file1.yml', 'file2.yaml')).toEqual(expectedNested);
});
