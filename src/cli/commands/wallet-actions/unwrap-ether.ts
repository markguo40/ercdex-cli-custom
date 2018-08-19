import { ZeroExService } from '../../../services/zero-ex-service';
import { ICommandConfig } from '../../command-config';
import { initializeConfig } from '../../default-params';

interface IUnwrapEtherArgs {
  amount: string;
}

const unwrapEtherModule: ICommandConfig<IUnwrapEtherArgs> = {
  command: 'unwrap',
  describe: 'Convert Wrapped Ether to Ether',
  builder: {
    amount: {
      alias: 'a',
      describe: 'Amount of Ether in wei',
      require: true
    }
  },
  handler: async args => {
    await initializeConfig(args);

    await new ZeroExService().unwrapEther(args.amount);
    process.exit(0);
  }
};

export = unwrapEtherModule;
