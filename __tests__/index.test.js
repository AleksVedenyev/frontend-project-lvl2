import getDiff from '../src/index.js';

test('getDiff', () => {
  expect(getDiff('before.json', 'after.json')).toEqual(
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
