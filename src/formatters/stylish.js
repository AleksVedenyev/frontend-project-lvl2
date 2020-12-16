import _ from 'lodash';

const currentIndent = (depth) => ' '.repeat(depth * 4 + 2);
const bracketIndent = (depth) => ' '.repeat(depth * 4);

const stringify = (node, depth) => {
  if (!_.isObject(node)) {
    return node;
  }

  const deepObj = Object.entries(node).flatMap(([key, value]) => {
    if (_.isObject(value)) {
      return `${currentIndent(depth)}  ${key}: ${stringify(value, depth + 1)}`;
    }
    return `${currentIndent(depth)}  ${key}: ${value}`;
  });
  return [
    '{',
    ...deepObj,
    `${bracketIndent(depth)}}`,
  ].join('\n');
};

const render = (diff, depth) => diff.flatMap((element) => {
  const {
    key, value, type, children,
  } = element;
  if (type === 'added') {
    return `${currentIndent(depth)}+ ${key}: ${stringify(value, depth + 1)}`;
  }
  if (type === 'unchanged') {
    return `${currentIndent(depth)}  ${key}: ${stringify(value, depth + 1)}`;
  }
  if (type === 'deleted') {
    return `${currentIndent(depth)}- ${key}: ${stringify(value, depth + 1)}`;
  }
  if (type === 'changed') {
    return [
      `${currentIndent(depth)}- ${key}: ${stringify(value.oldValue, depth + 1)}`,
      `${currentIndent(depth)}+ ${key}: ${stringify(value.newValue, depth + 1)}`,
    ].join('\n');
  }
  if (type === 'embedded') {
    return [
      `${currentIndent(depth)}  ${key}: {\n${render(children, depth + 1).join('\n')}`,
      `${bracketIndent(depth + 1)}}`,
    ].join('\n');
  }
  throw new Error(`Unknown type: ${type}!`);
});

const diffStylish = (diff) => {
  const result = render(diff, 0);
  return `{\n${result.join('\n')}\n}`;
};

export default diffStylish;
