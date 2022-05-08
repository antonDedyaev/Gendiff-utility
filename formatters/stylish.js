import _ from 'lodash';

const initialIndent = 2;
const spacer = ' ';
const spacesIncrement = 4;

const keyIndent = (depth) => spacer.repeat(initialIndent + (depth * spacesIncrement));
const bracketIndent = (depth) => spacer.repeat(depth * spacesIncrement);

const stringify = (data, depth) => {
  if (!_.isObject(data)) {
    return `${data}`;
  }
  const result = Object
    .entries(data)
    .map(([key, value]) => (`${keyIndent(depth + 1)}  ${key}: ${stringify(value, depth + 1)}`));
  return `{\n${result.join('\n')}\n${bracketIndent(depth + 1)}}`;
};

const stylish = (tree) => {
  const format = (node, depth) => {
    const setFormat = node.map(({
      key, type, children, value, valBefore, valAfter,
    }) => {
      switch (type) {
        case 'nested':
          return `${keyIndent(depth)}  ${key}: ${format(children, depth + 1)}`;
        case 'added':
          return `${keyIndent(depth)}+ ${key}: ${stringify(value, depth)}`;
        case 'deleted':
          return `${keyIndent(depth)}- ${key}: ${stringify(value, depth)}`;
        case 'unchanged':
          return `${keyIndent(depth)}  ${key}: ${stringify(value, depth)}`;
        case 'changed':
          return `${keyIndent(depth)}- ${key}: ${stringify(valBefore, depth)}\n${keyIndent(depth)}+ ${key}: ${stringify(valAfter, depth)}`;
        default:
          return null;
      }
    });
    return `{\n${setFormat.join('\n')}\n${bracketIndent(depth)}}`;
  };
  return format(tree, 0);
};
export default stylish;
