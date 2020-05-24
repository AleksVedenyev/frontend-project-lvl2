import program from 'commander';
import getDiff from './index.js';

const programm = program
  .version('1.0.0')
  .description('Compares two configuration files and shows a difference.')
  .option('-f, --format [type]', 'output format')
  .arguments('<filepath1> <filepath2>')
  .action((filepath1, filepath2) => {
    console.log(getDiff(filepath1, filepath2));
  });
program.parse(process.argv);

export default () => programm;
