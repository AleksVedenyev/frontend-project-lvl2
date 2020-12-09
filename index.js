import fs from 'fs';
import path from 'path';
import getParsedData from './src/parsers.js';
import getDiff from './src/getDiff.js';
import stylish from './src/formatters/stylish.js';
import formatSelector from './src/formatters/index.js';

const readFile = (filepath) => fs.readFileSync(path.resolve(process.cwd(), filepath), 'utf-8');

const result = (filepath1, filepath2, formatName = 'stylish') => {
  const extensionOfFile1 = path.extname(filepath1);
  const extensionOfFile2 = path.extname(filepath2);
  const contentOfFile1 = readFile(filepath1);
  const contentOfFile2 = readFile(filepath2);
  const parsedDataFromFile1 = getParsedData(extensionOfFile1, contentOfFile1);
  const parsedDataFromFile2 = getParsedData(extensionOfFile2, contentOfFile2);
  const diff = getDiff(parsedDataFromFile1, parsedDataFromFile2);
  return formatSelector(diff, formatName);
};

export default result;
