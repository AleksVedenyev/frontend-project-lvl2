import _ from 'lodash';

const stringify = (value) => {
  if (_.isObject(value)) {
    return '[complex value]';
  }
  if (typeof value === 'string') {
    return `'${value}'`;
  }
  return value;
};

const render = (diff, parentsNamesOfObj) => diff.flatMap((element) => {
  const {
    key, value, type, children,
  } = element;
  const parentNames = [...parentsNamesOfObj, key];
  if (type === 'added') {
    return `Property '${parentNames.join('.')}' was added with value: ${stringify(value)}`;
  }
  if (type === 'deleted') {
    return `Property '${parentNames.join('.')}' was removed`;
  }
  if (type === 'changed') {
    return `Property '${parentNames.join('.')}' was updated. From ${stringify(value.oldValue)} to ${stringify(value.newValue)}`;
  }
  if (type === 'embedded') {
    return render(children, parentNames);
  }
  if (type === 'unchanged') {
    return '';
  }
  throw new Error(`Unknown type: ${type}!`);
});

const diffPlain = (diff) => {
  const result = render(diff, []);
  return `${result.filter((item) => item !== '').join('\n')}`;
};

export default diffPlain;
