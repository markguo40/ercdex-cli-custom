import * as yargs from 'yargs';
import { startAqueductServer } from '../../server';
import { initializeConfig } from '../default-params';

const serverModule: yargs.CommandModule = {
  command: 'server',
  describe: 'Start the server',
  builder: {
    port: {
      alias: 'p',
      description: 'Port',
      default: '8700'
    }
  },
  handler: async args => {
    await initializeConfig(args);
    await startAqueductServer();
  }
};

export = serverModule;
