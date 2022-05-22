import path from 'path';
import yaml from 'js-yaml';
import readFile from './fileReader.js';

const parse = (filename) => {
  const format = path.extname(filename).slice(1);
  switch (format) {
    case 'json':
      return JSON.parse(readFile(filename));
    case 'yml':
      return yaml.load(readFile(filename));
    default:
      return yaml.load(readFile(filename));
  }
};
export default parse;
