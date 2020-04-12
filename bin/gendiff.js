#!/usr/bin/env node

import { version, parse } from 'commander';

version('1.0.0')
    .description('Compares two configuration files and shows a difference.')
    .option('-f, --format [type]', 'output format')
    .arguments('<firstConfig> <secondConfig>')

    parse(process.argv);