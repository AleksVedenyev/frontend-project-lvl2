import yaml from 'js-yaml';
import path from 'path';
import fs from 'fs';
import ini from 'ini';

const getData = (filepath) => fs.readFileSync(path.resolve(process.cwd(), filepath), 'utf-8');

const getParsedFile = (extension, file) => {
  if (extension === '.json') {
    return JSON.parse(file);
  }
  if (extension === '.yml') {
    return yaml.safeLoad(file);
  }
  return ini.parse(file);
};


export default (filepath) => {
  const file = getData(filepath);
  const fileExtension = path.extname(filepath);
  return getParsedFile(fileExtension, file);
};
