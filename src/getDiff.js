import _ from 'lodash';

const getDiff = (obj1, obj2) => {
  const keys = _.sortBy(_.union(_.keys(obj1), _.keys(obj2)));
  const result = (arr) => arr.map((key) => {
    const oldValue = obj1[key];
    const newValue = obj2[key];
    if (!_.has(obj1, key)) {
      return { key, value: newValue, type: 'added' };
    }
    if (!_.has(obj2, key)) {
      return { key, value: oldValue, type: 'deleted' };
    }
    if (_.isPlainObject(oldValue) && _.isPlainObject(newValue)) {
      return { key, children: getDiff(oldValue, newValue), type: 'embedded' };
    }
    if (oldValue !== newValue) {
      return { key, value: { oldValue, newValue }, type: 'changed' };
    }
    return { key, value: oldValue, type: 'unchanged' };
  });
  return result(keys);
};

export default getDiff;
