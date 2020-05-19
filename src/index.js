import fs from 'fs';
import path from 'path';

const getDiff = (filepath1, filepath2) => {
  const getDataFromFirstJson = JSON.parse(fs.readFileSync(path.resolve(process.cwd(), filepath1)));
  const getDataFromSecondJson = JSON.parse(fs.readFileSync(path.resolve(process.cwd(), filepath2)));
  const keysBefore = Object.keys(getDataFromFirstJson);
  const keysAfter = Object.keys(getDataFromSecondJson);
  const diffirenceOfBefore = keysBefore.reduce((acc, key) => {
    if (keysAfter.includes(key)) {
      if (getDataFromFirstJson[key] === getDataFromSecondJson[key]) {
        acc.push(`    ${key}: ${getDataFromSecondJson[key]}`);
      } else {
        acc.push([`  + ${key}: ${getDataFromSecondJson[key]}`]);
        acc.push([`  - ${key}: ${getDataFromFirstJson[key]}`]);
      }
    } else {
      acc.push([`  - ${key}: ${getDataFromFirstJson[key]}`]);
    }
    return acc;
  }, []);
  const diffirenceOfAfter = keysAfter.reduce((acc, key) => {
    if (!keysBefore.includes(key)) {
      acc.push([`  + ${key}: ${getDataFromSecondJson[key]}`]);
    }
    return acc;
  }, diffirenceOfBefore);
  return console.log(`{\n${diffirenceOfAfter.join('\n')}\n}`);
};

export default getDiff;
