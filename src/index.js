import getParsedData from './parsers.js';
import getDiff from './getDiff.js';
import stylish from './stylish.js';

const result = (filepath1, filepath2, format = stylish) => {
  const dataFromFirstPath = getParsedData(filepath1);
  const dataFromSecondPath = getParsedData(filepath2);
  const diff = getDiff(dataFromFirstPath, dataFromSecondPath);
  return stylish(diff, format);
};

export default result;
