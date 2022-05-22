import { test, expect, describe } from '@jest/globals';
import genDiff from '../src/diffFunc.js';
import readFile from '../src/utils/fileReader.js';

const expectedNested = readFile('referenceNested.txt');
const expectedPlain = readFile('referencePlain.txt');
const expectedJSON = readFile('referenceJSON.txt');

describe('compare YAML/JSON files', () => {
  test('stylish formatter', () => {
    expect(genDiff('file1.yml', 'file2.yaml', 'stylish')).toEqual(expectedNested);
  });

  test('plain formatter', () => {
    expect(genDiff('file1.json', 'file2.json', 'plain')).toEqual(expectedPlain);
  });

  test('json formatter', () => {
    expect(genDiff('file1.yml', 'file2.json', 'json')).toEqual(expectedJSON);
  });
});
