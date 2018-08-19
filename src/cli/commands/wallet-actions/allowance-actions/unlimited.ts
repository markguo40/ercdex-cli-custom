import { WalletService } from '../../../../services/wallet/wallet-service';
import { ICommandConfig } from '../../../command-config';
import { initializeConfig } from '../../../default-params';
import { processError } from '../../../utils/error';

interface IGetAllowanceParams {
  tokenAddress: string;
}

const setUnlimitedAllowanceModule: ICommandConfig<IGetAllowanceParams> = {
  command: 'unlimited',
  describe: 'Set an unlimited allowance for token address',
  builder: {
    tokenAddress: {
      alias: 't',
      required: true
    }
  },
  handler: async args => {
    await initializeConfig(args);

    try {
      await new WalletService().setUnlimitedAllowance({ tokenAddress: args.tokenAddress });
      process.exit(0);
      return;
    } catch (err) {
      return processError(err.message);
    }
  }
};

export = setUnlimitedAllowanceModule;
