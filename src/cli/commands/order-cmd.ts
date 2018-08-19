import * as yargs from 'yargs';

const orderModule: yargs.CommandModule = {
  command: 'order <cmd>',
  describe: 'Work with orders',
  builder: y => {
    return y.commandDir('order-actions');
  },
  handler: () => { return; }
};

export = orderModule;
