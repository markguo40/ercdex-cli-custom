import * as yargs from 'yargs';

const walletModule: yargs.CommandModule = {
  command: 'allowance <cmd>',
  describe: 'Work with token allowances',
  builder: y => {
    return y.commandDir('allowance-actions');
  },
  handler: () => { return; }
};

export = walletModule;
