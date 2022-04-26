import path from 'path';
import { readFileSync } from 'fs';
import { fileURLToPath } from 'url';
import _ from 'lodash';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const getFixturePath = (filename) => path.resolve(__dirname, '..', '__fixtures__', filename);
const readFile = (filename) => readFileSync(getFixturePath(filename), 'utf-8');

const genDiff = (filename1, filename2) => {
  const objFromJson1 = JSON.parse(readFile(filename1));
  const objFromJson2 = JSON.parse(readFile(filename2));
  const keysOfObj1 = Object.keys(objFromJson1);
  const keysOfObj2 = Object.keys(objFromJson2);
  const allKeys = _.sortBy(keysOfObj1.concat(keysOfObj2));
  const difference = _.sortedUniq(allKeys)
    .reduce((acc, el) => {
      if (!keysOfObj2.includes(el)) {
        return [...acc, `  - ${el}: ${objFromJson1[el]}`];
      }
      if (!keysOfObj1.includes(el)) {
        return [...acc, `  + ${el}: ${objFromJson2[el]}`];
      }
      return objFromJson1[el] === objFromJson2[el]
        ? [...acc, `    ${el}: ${objFromJson1[el]}`]
        : [...acc, `  - ${el}: ${objFromJson1[el]}`, `  + ${el}: ${objFromJson2[el]}`];
    }, []);
  return `{\n${difference.join('\n')}\n}`;
};
export { genDiff, readFile };
