import { CancelOrder, SignerType } from '@ercdex/core';
import { config } from '../../config';
import { web3service } from '../web3-service';

export interface ICancelOrderParams {
  orderHash: string;
}

export class CancelOrderService {
  public async cancel(params: ICancelOrderParams) {
    const result = await new CancelOrder({
      provider: web3service.getWeb3().getProvider(),
      signerType: SignerType.Default,
      orderHash: params.orderHash,
      account: config.keyService.getAccount().toLowerCase()
    }).execute();

    if (!result.success) {
      throw new Error(result.message);
    }

    return result.message;
  }
}
