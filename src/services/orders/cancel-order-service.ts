import { CancelOrder, SignerType } from '@ercdex/core';
import { web3service } from '../web3-service';

export interface ICancelOrderParams {
  orderHash: string;
  account: string;
}

export class CancelOrderService {
  public async cancel(params: ICancelOrderParams) {
    const result = await new CancelOrder({
      provider: web3service.getWeb3().getProvider(),
      signerType: SignerType.Default,
      orderHash: params.orderHash,
      account: params.account.toLowerCase()
    }).execute();

    if (!result.success) {
      throw new Error(result.message);
    }

    return result.message;
  }
}
