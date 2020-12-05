import stylish from './stylish.js';
import plain from './plain.js';
import json from './json.js';

const formatSelector = (diff, formatName) => {
  if (formatName === 'stylish') {
    return stylish(diff);
  }
  if (formatName === 'plain') {
    return plain(diff);
  }
  if (formatName === 'json') {
    return json(diff);
  }
};

export default formatSelector;
