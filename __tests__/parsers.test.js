import getParsedFile from '../src/parsers.js';

test('getDiff', () => {
  expect(getParsedFile('after.json')).toEqual({ timeout: 20, verbose: true, host: 'hexlet.io' });
});
