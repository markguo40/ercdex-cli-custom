import { Get, Post, Query, Route, Tags } from 'tsoa';
import { config } from '../config';
import { ServerError } from '../server-error';
import { web3service } from '../services/web3-service';
import { ZeroExService } from '../services/zero-ex-service';

@Route('wallet')
export class WalletController {
  @Get('account')
  @Tags('Wallet')
  public async GetAccount(): Promise<string> {
    return config.keyService.getAccount();
  }

  @Get('balance')
  @Tags('Wallet')
  public async GetBalance(@Query() tokenAddress: string): Promise<string> {
    try {
      return await new ZeroExService().getTokenBalance(tokenAddress);
    } catch (err) {
      throw new ServerError(err.message);
    }
  }

  @Post('wrap_ether')
  @Tags('Wallet')
  public async WrapEther(@Query() amount: string) {
    try {
      return await new ZeroExService().wrapEther(amount);
    } catch (err) {
      throw new ServerError(err.message);
    }
  }

  @Post('unwrap_ether')
  @Tags('Wallet')
  public async UnwrapEther(@Query() amount: string) {
    try {
      return await new ZeroExService().unwrapEther(amount);
    } catch (err) {
      throw new ServerError(err.message);
    }
  }

  @Get('ether_balance')
  @Tags('Wallet')
  public async GetEtherBalance(): Promise<string> {
    try {
      return (await web3service.getEthBalance()).toString();
    } catch (err) {
      throw new ServerError(err.message);
    }
  }
}
