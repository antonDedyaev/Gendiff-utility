import stylish from './stylish.js';
import plain from './plain.js';
import json from './json.js';

const defineFormat = (node, formatName) => {
  let formatter;
  if (formatName === 'stylish') {
    formatter = stylish(node);
  } else if (formatName === 'plain') {
    formatter = plain(node);
  } else if (formatName === 'json') {
    formatter = json(node);
  }
  return formatter;
};
export default defineFormat;
