import getParsedData from './parsers.js';

const getDiff = (filepath1, filepath2) => {
  const getDataFromFirstPath = getParsedData(filepath1);
  const getDataFromSecondPath = getParsedData(filepath2);
  const keysOfFirstFile = Object.keys(getDataFromFirstPath);
  const keysOfSecondFile = Object.keys(getDataFromSecondPath);
  const getDiffInFirstFile = keysOfFirstFile.reduce((acc, key) => {
    if (keysOfSecondFile.includes(key)) {
      if (getDataFromFirstPath[key] === getDataFromSecondPath[key]) {
        acc.push(`    ${key}: ${getDataFromSecondPath[key]}`);
      } else {
        acc.push([`  + ${key}: ${getDataFromSecondPath[key]}`]);
        acc.push([`  - ${key}: ${getDataFromFirstPath[key]}`]);
      }
    } else {
      acc.push([`  - ${key}: ${getDataFromFirstPath[key]}`]);
    }
    return acc;
  }, []);
  const getDiffInSecondFile = keysOfSecondFile.reduce((acc, key) => {
    if (!keysOfFirstFile.includes(key)) {
      acc.push([`  + ${key}: ${getDataFromSecondPath[key]}`]);
    }
    return acc;
  }, getDiffInFirstFile);
  return `{\n${getDiffInSecondFile.join('\n')}\n}`;
};

export default getDiff;
