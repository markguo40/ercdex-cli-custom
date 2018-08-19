import { Get, Post, Query, Route, Tags } from 'tsoa';
import { ServerError } from '../server-error';
import { WalletService } from '../services/wallet/wallet-service';

@Route('wallet/allowances')
export class AllowanceController {
  @Get()
  @Tags('Allowance')
  public async GetAllowance(@Query() tokenAddress: string): Promise<string> {
    try {
      return await new WalletService().getAllowance(tokenAddress);
    } catch (err) {
      throw new ServerError(err.message);
    }
  }

  @Post('unlimited')
  @Tags('Allowance')
  public async SetUnlimitedAllowance(@Query() tokenAddress: string) {
    try {
      await new WalletService().setUnlimitedAllowance({ tokenAddress });
    } catch (err) {
      throw new ServerError(err.message);
    }
  }

  @Post('remove')
  @Tags('Allowance')
  public async RemoveAllowance(@Query() tokenAddress: string) {
    try {
      await new WalletService().removeAllowance({ tokenAddress });
    } catch (err) {
      throw new ServerError(err.message);
    }
  }

  @Post('set')
  @Tags('Allowance')
  public async SetAllowance(@Query() tokenAddress: string, @Query() value: string) {
    try {
      await new WalletService().setAllowance({ tokenAddress, value });
    } catch (err) {
      throw new ServerError(err.message);
    }
  }
}
