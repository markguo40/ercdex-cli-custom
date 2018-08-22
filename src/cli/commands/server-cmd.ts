import { IServerParams, startAqueductServer } from '../../server';
import { ICommandConfig } from '../command-config';
import { initializeConfig } from '../default-params';

const serverModule: ICommandConfig<IServerParams> = {
  command: 'server',
  describe: 'Start the server',
  builder: {
    port: {
      alias: 'p',
      description: 'Port',
      default: '8700'
    },
    log: {
      alias: 'l',
      description: 'Log additional information',
      type: 'boolean'
    }
  },
  handler: async args => {
    await initializeConfig(args);
    await startAqueductServer(args);
  }
};

export = serverModule;
