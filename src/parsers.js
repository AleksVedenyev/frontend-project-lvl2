import yaml from 'js-yaml';
import path from 'path';
import ini from 'ini';

const getParsedFile = (extension, data) => {
  switch (extension) {
    case '.json':
      return JSON.parse(data);
    case '.yml':
      return yaml.safeLoad(data);
    case '.ini':
      return ini.parse(data);
    default:
      throw new Error(`Unknown extension: '${extension}'`);
  }
};

export default (filepath, data) => {
  const fileExtension = path.extname(filepath);
  return getParsedFile(fileExtension, data);
};
