import { ErcDex } from '@ercdex/core';
import { BigNumber } from 'bignumber.js';
import { tokenPairService } from '../../../services/token-pair-service';
import { ZeroExService } from '../../../services/zero-ex-service';
import { ICommandConfig } from '../../command-config';
import { InitializeConfig } from '../../default-params';

const sendModule: ICommandConfig<{ symbol: string; amount: string; to: string }> = {
  command: 'send',
  describe: 'Send Token',
  builder: {
    symbol: {
      alias: 's',
      describe: 'Token Symbol',
      required: true
    },
    amount: {
      alias: 'a',
      describe: 'Amount of token in wei',
      required: true
    },
    to: {
      alias: 't',
      describe: 'Recipient address',
      required: true
    }
  },
  handler: async args => {
    await InitializeConfig(args);

    let token: ErcDex.Api.IToken;
    try {
      token = await tokenPairService.getToken(args.symbol);
    } catch (err) {
      console.error(`Couldn't find token with symbol ${args.symbol}.`);
      process.exit(1);
      return;
    }

    try {
      const service = new ZeroExService();
      await service.sendToken(token.address, new BigNumber(args.amount), args.to);
      process.exit(0);
    } catch (err) {
      console.error(`Couldn't send token ${token.symbol}: ${err.message}.`);
      process.exit(1);
    }
  }
};

export = sendModule;
