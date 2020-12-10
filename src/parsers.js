import yaml from 'js-yaml';

const getParsedFile = (extension, data) => {
  switch (extension) {
    case 'json':
      return JSON.parse(data);
    case 'yml':
      return yaml.safeLoad(data);
    default:
      throw new Error(`Unknown extension: '${extension}'`);
  }
};

export default getParsedFile;
