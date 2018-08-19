import { ZeroExService } from '../../../services/zero-ex-service';
import { ICommandConfig } from '../../command-config';
import { initializeConfig } from '../../default-params';

interface IWrapEtherArgs {
  amount: string;
}

const wrapEtherModule: ICommandConfig<IWrapEtherArgs> = {
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
    await initializeConfig(args);

    await new ZeroExService().wrapEther(args.amount);
    process.exit(0);
  }
};

export = wrapEtherModule;
