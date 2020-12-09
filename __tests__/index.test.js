import path from 'path';
import fs from 'fs';
import { fileURLToPath } from 'url';
import getDiff from '../index.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const getFixturePath = (filename) => path.join(__dirname, '..', '__fixtures__', filename);
const readFile = (filename) => fs.readFileSync(getFixturePath(filename), 'utf-8');

test('getDiff', () => {
  const expectedStylish = readFile('expectedStylish.txt');
  const expectPlain = readFile('expectPlain.txt');
  const expectJSON = readFile('expectJSON.txt');
  expect(getDiff(getFixturePath('before.json'), getFixturePath('after.json'), 'stylish')).toEqual(expectedStylish);
  expect(getDiff(getFixturePath('before.yml'), getFixturePath('after.yml'), 'stylish')).toEqual(expectedStylish);
  expect(getDiff(getFixturePath('before.json'), getFixturePath('after.json'), 'plain')).toEqual(expectPlain);
  expect(getDiff(getFixturePath('before.json'), getFixturePath('after.json'), 'json')).toEqual(expectJSON);
});
