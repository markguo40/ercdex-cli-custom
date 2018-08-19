import * as yargs from 'yargs';

const walletModule: yargs.CommandModule = {
  command: 'wallet <cmd>',
  describe: 'Interact with wallet',
  builder: y => {
    return y.commandDir('wallet-actions');
  },
  handler: () => { return; }
};

export = walletModule;
