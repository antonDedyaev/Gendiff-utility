import { test, expect } from '@jest/globals';
import genDiff from '../src/diffFunc.js';
import { readFile } from '../utils/parsers.js';

const expectedFlat = readFile('referenceFlats.txt');

test('compare flat JSON files', () => {
  expect(genDiff('file1.json', 'file2.json')).toEqual(expectedFlat);
});

test('compare flat YAML files', () => {
  expect(genDiff('file1.yml', 'file2.yaml')).toEqual(expectedFlat);
});
