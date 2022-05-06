import _ from 'lodash';

const setIndent = (depth = 1) => {
  const replacer = ' ';
  const initialIndent = 2;
  return replacer.repeat(initialIndent * depth);
};

const stringify = (data, depth = 1) => {
  if (!_.isObject(data)) {
    return `${data}`;
  }
  const result = Object
    .entries(data)
    .map(([key, value]) => (`${setIndent(depth)}${key}: ${stringify(value, depth + 1)}`));
  return `{\n${result.join('\n')}\n${setIndent(depth - 1)}}`;
};

const stylish = (tree) => {
  const format = (node, depth) => {
    const result = node.map(({
      key, type, children, value, valBefore, valAfter,
    }) => {
      switch (type) {
        case 'nested':
          return `${setIndent(depth)}  ${key}: ${format(children, depth + 1)}`;
        case 'added':
          return `${setIndent(depth)}+ ${key}: ${stringify(value, depth)}`;
        case 'deleted':
          return `${setIndent(depth)}- ${key}: ${stringify(value, depth)}`;
        case 'unchanged':
          return `${setIndent(depth)}  ${key}: ${stringify(value, depth)}`;
        case 'changed':
          return `${setIndent(depth)}- ${key}: ${stringify(valBefore, depth)}\n${setIndent(depth)}+ ${key}: ${stringify(valAfter, depth)}`;
        default:
          return null;
      }
    });
    return `{\n${result.join('\n')}\n${setIndent(depth - 1)}}`;
  };
  return format(tree, 1);
};
export default stylish;
