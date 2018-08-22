import { CreateOrderService, ICreateOrderArgs } from '../../../services/orders/create-order-service';
import { ICommandConfig } from '../../command-config';
import { InitializeConfig } from '../../default-params';
import { processError } from '../../utils/error';
import { processSuccess } from '../../utils/success';

const createOrderModule: ICommandConfig<ICreateOrderArgs> = {
  command: 'create',
  describe: 'Post an order',
  builder: {
    baseSymbol: {
      alias: 'b',
      description: 'Base token symbol (e.g. ZRX in ZRX/WETH)',
      required: true
    },
    quoteSymbol: {
      alias: 'q',
      description: 'Quote token symbol (e.g. WETH in ZRX/WETH)',
      required: true
    },
    side: {
      description: 'Trade side',
      choices: ['buy', 'sell'],
      required: true
    },
    quantity: {
      description: 'Quantity of base token in wei',
      required: true
    },
    expirationTimestamp: {
      alias: 'ex',
      description: 'Expiration date as unix timestamp (seconds)'
    },
    price: {
      description: 'Price (100 ZRX <-> 1 ETH) = ZRX price of .01',
      required: true
    }
  },
  handler: async args => {
    await InitializeConfig(args);

    try {
      const order = await new CreateOrderService().create(args);
      return processSuccess(`Order successfully created:\n${JSON.stringify(order, null, 2)}`);
    } catch (err) {
      return processError(err.message);
    }
  }
};

export = createOrderModule;
