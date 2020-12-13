import _ from 'lodash';

const isValueComplex = (value) => {
  if (_.isObject(value)) {
    return '[complex value]';
  }
  switch (typeof value) {
    case 'boolean':
      return value;
    case 'number':
      return value;
    case 'string':
      return `'${value}'`;
    default:
      return value;
  }
};

const render = (diff, parentsNamesOfObj) => diff.flatMap((element) => {
  const {
    key, value, type, children,
  } = element;
  const parentNames = [...parentsNamesOfObj, key];
  if (type === 'added') {
    return `Property '${parentNames.join('.')}' was added with value: ${isValueComplex(value)}`;
  }
  if (type === 'deleted') {
    return `Property '${parentNames.join('.')}' was removed`;
  }
  if (type === 'changed') {
    return `Property '${parentNames.join('.')}' was updated. From ${isValueComplex(value.oldValue)} to ${isValueComplex(value.newValue)}`;
  }
  if (type === 'embedded') {
    return render(children, parentNames);
  }
  if (type === 'unchanged') {
    return '';
  }
  return new Error('Unknown type!');
});

const diffPlain = (diff) => {
  const result = render(diff, []);
  return `${result.filter((item) => item !== '').join('\n')}`;
};

export default diffPlain;
