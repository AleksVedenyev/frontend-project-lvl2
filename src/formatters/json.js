/* const render = (diff) => diff.flatMap((element) => {
  const {
    key, value, type, children,
  } = element;
  if (type === 'added') {
    return JSON.stringify({ Key: key, value, type });
  }
  if (type === 'deleted') {
    return JSON.stringify({ key, value, type });
  }
  if (type === 'unchanged') {
    return JSON.stringify({ key, value, type });
  }
  if (type === 'changed') {
    return JSON.stringify({ key, oldValue: value.oldValue, newValue: value.newValue, type });
  }
  if (type === 'embedded') {
    return JSON.stringify({
      key, children: render(children), type,
    });
  }
}); */

const diffJSON = (diff) => JSON.stringify(diff);

export default diffJSON;
