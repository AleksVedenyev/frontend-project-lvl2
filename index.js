import fs from 'fs';
import path from 'path';
import parse from './src/parsers.js';
import getDiff from './src/getDiff.js';
import format from './src/formatters/index.js';

const readFile = (filepath) => fs.readFileSync(path.resolve(process.cwd(), filepath), 'utf-8');

const result = (filepath1, filepath2, formatName = 'stylish') => {
  const extensionOfFile1 = path.extname(filepath1).slice(1);
  const extensionOfFile2 = path.extname(filepath2).slice(1);
  const contentOfFile1 = readFile(filepath1);
  const contentOfFile2 = readFile(filepath2);
  const parsedDataFromFile1 = parse(extensionOfFile1, contentOfFile1);
  const parsedDataFromFile2 = parse(extensionOfFile2, contentOfFile2);
  const diff = getDiff(parsedDataFromFile1, parsedDataFromFile2);
  return format(diff, formatName);
};

export default result;
