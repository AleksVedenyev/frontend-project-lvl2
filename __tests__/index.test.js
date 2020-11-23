
import path from 'path';
import fs from 'fs';
import getDiff from '../src/index.js';

import { fileURLToPath } from 'url';
import { dirname } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const getFixturePath = (filename) => path.join(__dirname, '..', '__fixtures__', __dirname);
const readFile = (filename) => fs.readFile(getFixturePath(filename), 'utf-8');

test('getDiff', () => {
  expect(getDiff(readFile('file1.json'), readFile('file2.json'))).toEqual(
    `{
      common: {
        + follow: false
          setting1: Value 1
        - setting2: 200
        - setting3: true
        + setting3: null
        + setting4: blah blah
        + setting5: {
              key5: value5
          }
          setting6: {
              doge: {
                - wow: 
                + wow: so much
              }
              key: value
            + ops: vops
          }
      }
      group1: {
        - baz: bas
        + baz: bars
          foo: bar
        - nest: {
              key: value
          }
        + nest: str
      }
    - group2: {
          abc: 12345
          deep: {
              id: 45
          }
      }
    + group3: {
          fee: 100500
          deep: {
              id: {
                  number: 45
              }
          }
      }
  }`,
  );
  expect(getDiff(readFile('before.yml'), readFile('after.yml'))).toEqual(
    `{
    host: hexlet.io
  + timeout: 20
  - timeout: 50
  - proxy: 123.234.53.22
  - follow: false
  + verbose: true
}`,
  );
  expect(getDiff(readFile('before.ini'), readFile('after.ini'))).toEqual(
    `{
    host: hexlet.io
  + timeout: 20
  - timeout: 50
  - proxy: 123.234.53.22
  - follow: false
  + verbose: true
}`,
  );
});
