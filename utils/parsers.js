import path from 'path';
import yaml from 'js-yaml';
import { readFileSync } from 'fs';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const readFile = (filename) => readFileSync(path.resolve(__dirname, '..', '__fixtures__', filename), 'utf-8');

const parse = (filename) => {
  let parser;
  const format = path.extname(filename);
  if (format === '.json') {
    parser = JSON.parse(readFile(filename));
  }
  if (format === '.yaml' || format === '.yml') {
    parser = yaml.load(readFile(filename));
  }
  return parser;
};
export { parse, readFile };
