import _ from 'lodash';

const getBlank = (size) => ' '.repeat(size * 2);

const recursively = (value, size) => {
  if (!_.isObject(value)) {
    return value;
  }
  const isObject = Object.entries(value).map(([key, value2]) => {
    if (_.isObject(value2)) {
      return `      ${key}: ${recursively(value2, ' '.repeat(5))}`;
    }
    return `      ${key}: ${value2}`;
  });
  return `{\n${getBlank(size + 2)}${isObject}\n${getBlank(size)}}`;
};

const render = (diff, depth) => {
  const result = diff.flatMap((element) => {
    const {
      key, value, type, children,
    } = element;
    if (type === 'added') {
      return `${getBlank(depth)}+ ${key}: ${recursively(value, depth + 1)}`;
    }
    if (type === 'unchanged') {
      return `${getBlank(depth)}${key}: ${recursively(value, depth + 1)}`;
    }
    if (type === 'deleted') {
      return `${getBlank(depth)}- ${key}: ${recursively(value, depth + 1)}`;
    }
    if (type === 'changed') {
      return [
        `${getBlank(depth)}- ${key}: ${recursively(value.oldValue, depth + 1)}`,
        `${getBlank(depth)}+ ${key}: ${recursively(value.newValue, depth + 1)}`,
      ];
    }
    if (type === 'embedded') {
      return `${getBlank(depth)}  ${key}: {\n${render(children, depth + 2).join('\n')}\n${getBlank(depth + 1)}`;
    }
  });
  return `{\n${result.join('\n')}\n}`;
};

const result = (diff) => render(diff, 1);

export default result;
