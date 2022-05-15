import path from 'path';
import yaml from 'js-yaml';
import { readFileSync } from 'fs';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const readFile = (filename) => readFileSync(path.resolve(__dirname, '../..', '__fixtures__', filename), 'utf-8');

const parse = (filename) => {
  const format = path.extname(filename).slice(1);
  switch (format) {
    case 'json':
      return JSON.parse(readFile(filename));
    case 'yml':
      return yaml.load(readFile(filename));
    case 'yaml':
      return yaml.load(readFile(filename));
    default:
      return null;
  }
};
export { parse, readFile };
