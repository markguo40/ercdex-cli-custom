import { ErcDex, FillOrders, SignerType } from '@ercdex/core';
import { Spinner } from 'cli-spinner';
import { config } from '../../config';
import { sleep } from '../../utils/sleep';
import { web3service } from '../web3-service';

export interface IFillOrdersParams {
  data: string[];
}

export class FillOrdersService {
  public async fillOrders(args: IFillOrdersParams) {
    const fills = new Array<ErcDex.Api.IOrderFill>();
    for (let d of args.data) {
      const parts = d.split(':');
      if (parts.length !== 2) {
        throw new Error(`Invalid format: data should be in format <orderHash>:<takerAmountInWei>`);
      }

      const [orderHash, takerAmount] = parts;
      fills.push({
        orderHash,
        takerAmount
      });
    }

    const spinner = new Spinner('Order settlement pending...').start();
    try {
      let receipt = await new FillOrders({
        signerType: SignerType.Default,
        taker: config.keyService.getAccount(),
        provider: web3service.getWeb3().getProvider(),
        fills
      }).execute();

      while (true) {
        receipt = await new ErcDex.Api.TradeService().getReceipt({ id: receipt.id });
        if (receipt.status === 'success') {
          spinner.stop();
          return receipt;
        }

        if (receipt.status === 'error') {
          throw new Error(`Failed to fill orders - check tx ${receipt.txHash} for more information.`);
        }

        await sleep(1000);
      }
    } catch (err) {
      spinner.stop();
      throw err;
    }
  }
}
