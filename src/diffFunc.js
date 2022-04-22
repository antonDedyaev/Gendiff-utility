import { readFileSync } from 'fs';
import path from 'path';
import _ from 'lodash';

const filepath = (filename) => path.resolve(process.cwd(), filename);

const genDiff = (filename1, filename2) => {
  const absolutePath1 = readFileSync(filepath(filename1), 'utf-8');
  const absolutePath2 = readFileSync(filepath(filename2), 'utf-8');
  const objFromJson1 = JSON.parse(absolutePath1);
  const objFromJson2 = JSON.parse(absolutePath2);
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
export default genDiff;
