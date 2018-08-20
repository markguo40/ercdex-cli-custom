import { CancelOrderService, ICancelOrderParams } from '../../../services/orders/cancel-order-service';
import { ICommandConfig } from '../../command-config';
import { initializeConfig } from '../../default-params';
import { processError } from '../../utils/error';
import { processSuccess } from '../../utils/success';

const cancelOrderModule: ICommandConfig<ICancelOrderParams> = {
  command: 'cancel',
  describe: 'Cancel an order',
  builder: {
    orderHash: {
      alias: 'hash',
      describe: 'Computed order hash',
      required: true
    }
  },
  handler: async args => {
    await initializeConfig(args);

    try {
      const msg = await new CancelOrderService().cancel(args);
      return processSuccess(msg);
    } catch (err) {
      return processError(`${err.message}`);
    }
  }
};

export = cancelOrderModule;
