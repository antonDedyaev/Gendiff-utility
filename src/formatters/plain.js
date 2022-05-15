import _ from 'lodash';

const valueFormat = (value) => {
  if (_.isString(value)) {
    return `'${value}'`;
  }
  return ((_.isObject(value)) ? '[complex value]' : value);
};

const plain = (tree) => {
  const pathToRoot = (node, property = '') => {
    const setFormat = node.flatMap(({
      key, type, children, value, valBefore, valAfter,
    }) => {
      switch (type) {
        case 'nested':
          return pathToRoot(children, `${property}${key}.`);
        case 'added':
          return `Property '${property}${key}' was added with value: ${valueFormat(value)}`;
        case 'deleted':
          return `Property '${property}${key}' was removed`;
        case 'changed':
          return `Property '${property}${key}' was updated. From ${valueFormat(valBefore)} to ${valueFormat(valAfter)}`;
        default:
          return [];
      }
    });
    return `${setFormat.join('\n')}`;
  };
  return pathToRoot(tree);
};
export default plain;
