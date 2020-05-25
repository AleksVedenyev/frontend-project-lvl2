import yaml from 'js-yaml';
import path from 'path';
import fs from 'fs';

const getFile = (filepath) => fs.readFileSync(path.resolve(process.cwd(), filepath));

const getParsedFile = (extension, file) => (extension === 'json' ? JSON.parse(file) : yaml.safeLoad(file));

export default (filepath) => {
  const file = getFile(filepath);
  const fileExtension = path.extname(filepath);
  return getParsedFile(fileExtension, file);
};
