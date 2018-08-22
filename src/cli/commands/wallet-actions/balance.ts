import { ZeroEx } from '0x.js';
import { ErcDex } from '@ercdex/core';
import { BigNumber } from 'bignumber.js';
import chalk from 'chalk';
import { tokenPairService } from '../../../services/token-pair-service';
import { web3service } from '../../../services/web3-service';
import { ZeroExService } from '../../../services/zero-ex-service';
import { ICommandConfig } from '../../command-config';
import { InitializeConfig } from '../../default-params';

const balanceModule: ICommandConfig<{ symbol: string }> = {
  command: 'balance',
  describe: 'Get Token Balance',
  builder: {
    symbol: {
      alias: 's',
      describe: 'Token Symbol',
      required: true
    }
  },
  handler: async args => {
    await InitializeConfig(args);

    if (args.symbol === 'ETH') {
      const ethBalance = await web3service.getEthBalance();
      const color = ethBalance.isZero() ? 'red' : 'green';

      console.log(chalk[color](`ETH Balance: ${ZeroEx.toUnitAmount(ethBalance, 18).toString()} (${ethBalance.toString()})`));
      process.exit(0);
      return;
    }

    let token: ErcDex.Api.IToken;
    try {
      token = await tokenPairService.getToken(args.symbol);
    } catch (err) {
      console.error(`Couldn't find token with symbol ${args.symbol}.`);
      process.exit(1);
      return;
    }

    try {
      const balance = new BigNumber(await new ZeroExService().getTokenBalance(token.address));
      const color = balance.isZero() ? 'red' : 'green';
      console.log(chalk[color](`${token.symbol} Balance: ${ZeroEx.toUnitAmount(balance, token.decimals).toString()} (${balance.toString()})`));
      process.exit(0);
      return;
    } catch (err) {
      console.error(`Couldn't fetch balance for token ${token.symbol}: ${err.message}.`);
      process.exit(1);
    }
  }
};

export = balanceModule;
