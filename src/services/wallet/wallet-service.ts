import { ZeroExService } from '../zero-ex-service';

export interface IAllowanceParams {
  tokenAddress: string;
}

export interface ISetAllowanceParams extends IAllowanceParams {
  value: string;
}

export class WalletService {
  public async setUnlimitedAllowance(params: IAllowanceParams) {
    await new ZeroExService().setTokenAllowance(params);
  }

  public async removeAllowance(params: IAllowanceParams) {
    await new ZeroExService().setTokenAllowance({
      tokenAddress: params.tokenAddress,
      value: '0'
    });
  }

  public async setAllowance(params: ISetAllowanceParams) {
    await new ZeroExService().setTokenAllowance(params);
  }

  public async getAllowance(tokenAddress: string) {
    return await new ZeroExService().getTokenAllowance(tokenAddress);
  }
}
