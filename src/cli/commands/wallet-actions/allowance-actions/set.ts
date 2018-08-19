import { WalletService } from '../../../../services/wallet/wallet-service';
import { ICommandConfig } from '../../../command-config';
import { initializeConfig } from '../../../default-params';
import { processError } from '../../../utils/error';

interface IGetAllowanceParams {
  tokenAddress: string;
  value: string;
}

const removeAllowanceModule: ICommandConfig<IGetAllowanceParams> = {
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
    await initializeConfig(args);

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
