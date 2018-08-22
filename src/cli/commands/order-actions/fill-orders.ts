import { FillOrdersService, IFillOrdersParams } from '../../../services/orders/fill-orders-service';
import { ICommandConfig } from '../../command-config';
import { InitializeConfig } from '../../default-params';
import { processError } from '../../utils/error';
import { processSuccess } from '../../utils/success';

const fillOrdersModule: ICommandConfig<IFillOrdersParams> = {
  command: 'fill',
  describe: 'Fill one or more orders',
  builder: {
    data: {
      alias: 'd',
      describe: 'Fill data in the format <orderHash>:<takerAmountInWei>, e.g. abc123:10000000000000. Can pass multiple.',
      array: true,
      required: true
    }
  },
  handler: async args => {
    await InitializeConfig(args);

    try {
      const receipt = await new FillOrdersService().fillOrders(args);
      return processSuccess(JSON.stringify(receipt, null, 2));
    } catch (err) {
      return processError(err.message);
    }
  }
};

export = fillOrdersModule;

// 0x227d2e79e24433990faf4054d49a632397a9c3bdfa467a63b0d8a9176b64dcca
