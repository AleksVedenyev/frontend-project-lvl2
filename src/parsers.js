import yaml from 'js-yaml';

const parseFactory = (data, format) => {
  switch (format) {
    case 'json':
      return JSON.parse(data);
    case 'yml':
      return yaml.safeLoad(data);
    default:
      throw new Error(`Unknown extension: '${format}'`);
  }
};

export default parseFactory;
