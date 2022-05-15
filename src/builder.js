import _ from 'lodash';

const buildTree = (obj1, obj2) => {
  const keysOfObj1 = Object.keys(obj1);
  const keysOfObj2 = Object.keys(obj2);
  const allKeys = _.sortBy(keysOfObj1.concat(keysOfObj2));
  const difference = _.sortedUniq(allKeys)
    .map((key) => {
      if (_.isObject(obj1[key]) && _.isObject(obj2[key])) {
        return { key, type: 'nested', children: buildTree(obj1[key], obj2[key]) };
      } if (!Object.hasOwn(obj1, key)) {
        return { key, type: 'added', value: obj2[key] };
      } if (!Object.hasOwn(obj2, key)) {
        return { key, type: 'deleted', value: obj1[key] };
      } if (obj1[key] === obj2[key]) {
        return { key, type: 'unchanged', value: obj1[key] };
      }
      return {
        key, type: 'changed', valBefore: obj1[key], valAfter: obj2[key],
      };
    });
  return difference;
};
export default buildTree;
