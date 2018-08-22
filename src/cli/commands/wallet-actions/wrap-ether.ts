import { ZeroExService } from '../../../services/zero-ex-service';
import { ICommandConfig } from '../../command-config';
import { InitializeConfig } from '../../default-params';

const wrapEtherModule: ICommandConfig<{ amount: string }> = {
  command: 'wrap',
  describe: 'Convert Ether to Wrapped Ether',
  builder: {
    amount: {
      alias: 'a',
      describe: 'Amount of Ether in wei',
      require: true
    }
  },
  handler: async args => {
    await InitializeConfig(args);

    await new ZeroExService().wrapEther(args.amount);
    process.exit(0);
  }
};

export = wrapEtherModule;
