import _ from 'lodash';

const isValueComplex = (value) => {
  if (_.isObject(value)) {
    return '[complex value]';
  }
  return value;
};

const render = (diff, parentsNamesOfObj) => diff.flatMap((element) => {
  const {
    key, value, type, children,
  } = element;
  const namesOfObj = [...parentsNamesOfObj, key];
  if (type === 'added') {
    return `Property '${namesOfObj.join('.')}' was added with value: '${isValueComplex(value)}'`;
  }
  if (type === 'deleted') {
    return `Property '${namesOfObj.join('.')}' was removed`;
  }
  if (type === 'changed') {
    return `Property '${namesOfObj.join('.')}' was updated. From '${isValueComplex(value.oldValue)}' to '${isValueComplex(value.newValue)}'`;
  }
  if (type === 'embedded') {
    return render(children, namesOfObj);
  }
});

const diffPlain = (diff) => {
  const result = render(diff, []);
  return `${result.join('\n')}`;
};

export default diffPlain;
