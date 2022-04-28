import _ from 'lodash';
import { parse } from '../utils/parsers.js';

const genDiff = (filename1, filename2) => {
  const objFromFile1 = parse(filename1);
  const objFromFile2 = parse(filename2);
  const keysOfObj1 = Object.keys(objFromFile1);
  const keysOfObj2 = Object.keys(objFromFile2);
  const allKeys = _.sortBy(keysOfObj1.concat(keysOfObj2));
  const difference = _.sortedUniq(allKeys)
    .reduce((acc, el) => {
      if (!keysOfObj2.includes(el)) {
        return [...acc, `  - ${el}: ${objFromFile1[el]}`];
      }
      if (!keysOfObj1.includes(el)) {
        return [...acc, `  + ${el}: ${objFromFile2[el]}`];
      }
      return objFromFile1[el] === objFromFile2[el]
        ? [...acc, `    ${el}: ${objFromFile1[el]}`]
        : [...acc, `  - ${el}: ${objFromFile1[el]}`, `  + ${el}: ${objFromFile2[el]}`];
    }, []);
  return `{\n${difference.join('\n')}\n}`;
};
export default genDiff;
