import getParsedData from './parsers.js';
import getDiff from './getDiff.js';
import stylish from './formatters/stylish.js';
import formatSelector from './formatters/index.js';

const result = (filepath1, filepath2, formatName = stylish) => {
  const dataFromFirstPath = getParsedData(filepath1);
  const dataFromSecondPath = getParsedData(filepath2);
  const diff = getDiff(dataFromFirstPath, dataFromSecondPath);
  return formatSelector(diff, formatName);
};

export default result;
