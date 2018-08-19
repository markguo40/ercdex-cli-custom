import { WalletService } from '../../../../services/wallet/wallet-service';
import { ICommandConfig } from '../../../command-config';
import { initializeConfig } from '../../../default-params';
import { processError } from '../../../utils/error';
import { processSuccess } from '../../../utils/success';

interface IGetAllowanceParams {
  tokenAddress: string;
}

const getAllowanceModule: ICommandConfig<IGetAllowanceParams> = {
  command: 'get',
  describe: 'Get current token allowance',
  builder: {
    tokenAddress: {
      alias: 't',
      required: true
    }
  },
  handler: async args => {
    await initializeConfig(args);

    try {
      const value = await new WalletService().getAllowance(args.tokenAddress);
      return processSuccess(`Allowance for ${args.tokenAddress}: ${value}`);
    } catch (err) {
      return processError(err.message);
    }
  }
};

export = getAllowanceModule;
