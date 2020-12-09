import fs from 'fs';
import path from 'path';
import getParsedData from './src/parsers.js';
import getDiff from './src/getDiff.js';
import stylish from './src/formatters/stylish.js';
import formatSelector from './src/formatters/index.js';

const getContentFromFile = (filepath) => fs.readFileSync(path.resolve(process.cwd(), filepath), 'utf-8');

const result = (filepath1, filepath2, formatName = stylish) => {
  const contentOfFile1 = getContentFromFile(filepath1);
  const contentOfFile2 = getContentFromFile(filepath2);
  const dataFromFirstPath = getParsedData(filepath1, contentOfFile1);
  const dataFromSecondPath = getParsedData(filepath2, contentOfFile2);
  const diff = getDiff(dataFromFirstPath, dataFromSecondPath);
  return formatSelector(diff, formatName);
};

export default result;
