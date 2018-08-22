import { IAllowanceParams, WalletService } from '../../../../services/wallet/wallet-service';
import { ICommandConfig } from '../../../command-config';
import { InitializeConfig } from '../../../default-params';
import { processError } from '../../../utils/error';

const removeAllowanceModule: ICommandConfig<IAllowanceParams> = {
  command: 'remove',
  describe: 'Remove (set to zero) allowance for token',
  builder: {
    tokenAddress: {
      alias: 't',
      required: true
    }
  },
  handler: async args => {
    await InitializeConfig(args);

    try {
      await new WalletService().removeAllowance({ tokenAddress: args.tokenAddress });
      process.exit(0);
      return;
    } catch (err) {
      return processError(err.message);
    }
  }
};

export = removeAllowanceModule;
