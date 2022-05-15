import stylish from './stylish.js';
import plain from './plain.js';
import json from './json.js';

const defineFormat = (node, formatName) => {
  switch (formatName) {
    case 'plain':
      return plain(node);
    case 'json':
      return json(node);
    default:
      return stylish(node);
  }
};
export default defineFormat;
