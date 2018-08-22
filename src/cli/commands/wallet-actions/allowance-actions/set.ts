import { ISetAllowanceParams, WalletService } from '../../../../services/wallet/wallet-service';
import { ICommandConfig } from '../../../command-config';
import { InitializeConfig } from '../../../default-params';
import { processError } from '../../../utils/error';

const removeAllowanceModule: ICommandConfig<ISetAllowanceParams> = {
  command: 'set',
  describe: 'Set token allowance to a particular value',
  builder: {
    tokenAddress: {
      alias: 't',
      required: true
    },
    value: {
      alias: 'v',
      describe: 'Token allowance in wei',
      required: true
    }
  },
  handler: async args => {
    await InitializeConfig(args);

    try {
      await new WalletService().setAllowance(args);
      process.exit(0);
      return;
    } catch (err) {
      return processError(err.message);
    }
  }
};

export = removeAllowanceModule;
