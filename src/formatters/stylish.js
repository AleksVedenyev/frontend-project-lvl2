import _ from 'lodash';

const getBlank = (deep) => ' '.repeat(deep * 4 + 2);
const getDistanceToLastBracket = (deep) => ' '.repeat(deep * 4);

const recursiveDeep = (node, deep) => {
  if (!_.isObject(node)) {
    return node;
  }

  const deepObj = Object.entries(node).flatMap(([key, value]) => {
    if (_.isObject(value)) {
      return `  ${getBlank(deep)}${key}: ${recursiveDeep(value, deep + 1)}`;
    }
    return `  ${getBlank(deep)}${key}: ${value}`;
  });
  return ['{', ...deepObj, `${getDistanceToLastBracket(deep)}}`].join('\n');
};

const render = (diff, depth) => diff.flatMap((element) => {
  const {
    key, value, type, children,
  } = element;
  if (type === 'added') {
    return `${getBlank(depth)}+ ${key}: ${recursiveDeep(value, depth + 1)}`;
  }
  if (type === 'unchanged') {
    return `${getBlank(depth)}  ${key}: ${recursiveDeep(value, depth + 1)}`;
  }
  if (type === 'deleted') {
    return `${getBlank(depth)}- ${key}: ${recursiveDeep(value, depth + 1)}`;
  }
  if (type === 'changed') {
    return `${getBlank(depth)}- ${key}: ${recursiveDeep(value.oldValue, depth + 1)}\n${getBlank(depth)}+ ${key}: ${recursiveDeep(value.newValue, depth + 1)}`;
  }
  if (type === 'embedded') {
    return `${getBlank(depth)}  ${key}: {\n${render(children, depth + 1).join('\n')}\n${getBlank(depth)}  }`;
  }
  return null;
});

const diffStylish = (diff) => {
  const result = render(diff, 0);
  return `{\n${result.join('\n')}\n}`;
};

export default diffStylish;
