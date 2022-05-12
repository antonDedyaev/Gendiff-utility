import stylish from './stylish.js';
import plain from './plain.js';

const defineFormat = (node, formatName) => {
  let formatter;
  if (formatName === 'stylish') {
    formatter = stylish(node);
  } if (formatName === 'plain') {
    formatter = plain(node);
  }
  return formatter;
};
export default defineFormat;
