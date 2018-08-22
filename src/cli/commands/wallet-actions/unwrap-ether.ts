import { ZeroExService } from '../../../services/zero-ex-service';
import { ICommandConfig } from '../../command-config';
import { InitializeConfig } from '../../default-params';

const unwrapEtherModule: ICommandConfig<{ amount: string }> = {
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
    await InitializeConfig(args);

    await new ZeroExService().unwrapEther(args.amount);
    process.exit(0);
  }
};

export = unwrapEtherModule;
