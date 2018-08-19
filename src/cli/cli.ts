#!/usr/bin/env node
import * as yargs from 'yargs';
import { defaultParams } from './default-params';

// tslint:disable-next-line:no-unused-expression
yargs
  .scriptName('ercdex-cli')
  .options(defaultParams)
  .commandDir('commands')
  .demandCommand()
  .help()
  .argv;
