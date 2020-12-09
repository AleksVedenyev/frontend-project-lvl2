import getParsedData from './src/parsers.js';
import getDiff from './src/getDiff.js';
import stylish from './src/formatters/stylish.js';
import formatSelector from './src/formatters/index.js';

const result = (filepath1, filepath2, formatName = stylish) => {
  const dataFromFirstPath = getParsedData(filepath1);
  const dataFromSecondPath = getParsedData(filepath2);
  const diff = getDiff(dataFromFirstPath, dataFromSecondPath);
  return formatSelector(diff, formatName);
};

export default result;
