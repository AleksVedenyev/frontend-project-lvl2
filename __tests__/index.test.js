/* eslint-disable no-underscore-dangle */

import path from 'path';
import fs from 'fs';
import { fileURLToPath } from 'url';
import getDiff from '../src/index.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const getFixturePath = (filename) => path.join(__dirname, '..', '__fixtures__', filename);
const readFile = (filename) => fs.readFileSync(getFixturePath(filename), 'utf-8');

test('getDiff', () => {
  const expected = readFile('expectedStylish.txt');
  expect(getDiff(getFixturePath('before.json'), getFixturePath('after.json'))).toEqual(expected);
  expect(getDiff(getFixturePath('before.yml'), getFixturePath('after.yml'))).toEqual(expected);
});
