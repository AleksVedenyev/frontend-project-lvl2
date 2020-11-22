import getParsedData from './parsers.js';

const getDiff = (filepath1, filepath2) => {
  const dataFromFirstPath = getParsedData(filepath1);
  const dataFromSecondPath = getParsedData(filepath2);
  const keysOfFirstFile = Object.keys(dataFromFirstPath);
  const keysOfSecondFile = Object.keys(dataFromSecondPath);
  const getDiffInFirstFile = keysOfFirstFile.reduce((acc, key) => {
    if (keysOfSecondFile.includes(key)) {
      if (dataFromFirstPath[key] === dataFromSecondPath[key]) {
        acc.push(`    ${key}: ${dataFromSecondPath[key]}`);
      } else {
        acc.push([`  + ${key}: ${dataFromSecondPath[key]}`]);
        acc.push([`  - ${key}: ${dataFromFirstPath[key]}`]);
      }
    } else {
      acc.push([`  - ${key}: ${dataFromFirstPath[key]}`]);
    }
    return acc;
  }, []);
  const getDiffInSecondFile = keysOfSecondFile.reduce((acc, key) => {
    if (!keysOfFirstFile.includes(key)) {
      acc.push([`  + ${key}: ${dataFromSecondPath[key]}`]);
    }
    return acc;
  }, getDiffInFirstFile);
  return `{\n${getDiffInSecondFile.join('\n')}\n}`;
};

export default getDiff;
