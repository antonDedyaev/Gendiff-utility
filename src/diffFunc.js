import parse from './utils/parsers.js';
import defineFormat from './formatters/index.js';
import buildTree from './builder.js';

const genDiff = (filename1, filename2, formatName) => {
  const objFromFile1 = parse(filename1);
  const objFromFile2 = parse(filename2);
  const tree = buildTree(objFromFile1, objFromFile2);
  return defineFormat(tree, formatName);
};
export default genDiff;
