import stylish from './stylish.js';
import plain from './plain.js';

const formatSelector = (diff, format) => {
  if (format === 'stylish') {
    return stylish(diff);
  }
  if (format === 'plain') {
    return plain(diff);
  }
};

export default formatSelector;
