import { ErcDex, Web3Wrapper } from '@ercdex/core';
import { BigNumber } from 'bignumber.js';
import chalk from 'chalk';
import { Spinner } from 'cli-spinner';
import { config } from '../config';
import { tokenPairService } from './token-pair-service';
import { web3service } from './web3-service';

const defaultGasParams = {
  gasLimit: 1000000
};

export class ZeroExService {
  public async sendToken(tokenAddress: string, amount: BigNumber, to: string) {
    const account = config.keyService.getAccount();

    const balance = new BigNumber(await web3service.erc20Token.getBalanceAsync(tokenAddress, account));
    if (balance.lessThan(amount)) {
      throw new Error(`Balance too low to send ${amount.toString()}: only have ${balance.toString()}`);
    }

    try {
      const txHash = await web3service.erc20Token.transferAsync(tokenAddress, account, to, amount);
      const receipt = await web3service.getWeb3().awaitTransactionMinedAsync(txHash);
      if (receipt.status === 0) {
        throw new Error(`Send transaction failed: check txHash ${txHash}`);
      } else {
        console.log(chalk.green('Tokens successfully sent.'));
        return;
      }
    } catch (err) {
      throw new Error(`Failed to send ${tokenAddress}: ${err.message}`);
    }
  }

  public async getTokenBalance(tokenAddress: string) {
    try {
      const account = config.keyService.getAccount();
      const balance = await web3service.erc20Token.getBalanceAsync(tokenAddress, account);
      return balance.toString();
    } catch (err) {
      throw new Error(`Failed to retrieve balance: ${err.message}`);
    }
  }

  public async getTokenAllowance(tokenAddress: string) {
    const account = config.keyService.getAccount();
    const allowance = await web3service.erc20Token.getProxyAllowanceAsync(tokenAddress, account);
    return allowance.toString();
  }

  public async setTokenAllowance(params: { tokenAddress: string; value?: string }) {
    const tokenAddress = params.tokenAddress;

    try {
      console.log(chalk.blueBright(`Setting allowance for ${tokenAddress}...`));
      const account = config.keyService.getAccount();

      let txHash: string;
      let value: BigNumber;
      if (params.value) {
        try {
          value = new BigNumber(params.value);
          if (!value.isInteger()) {
            throw new Error('must be integer');
          }
        } catch (err) {
          throw new Error(`Invalid value: ${err.message}`);
        }

        txHash = await web3service.erc20Token.setProxyAllowanceAsync(tokenAddress, account, value, defaultGasParams);
      } else {
        txHash = await web3service.erc20Token.setUnlimitedProxyAllowanceAsync(tokenAddress, account, defaultGasParams);
      }

      const spinner = new Spinner('Pending...');
      try {
        const receipt = await web3service.getWeb3().awaitTransactionMinedAsync(txHash);
        if (receipt.status === 0) {
          spinner.stop();
          throw new Error(`Transaction failed: ${txHash}`);
        } else {
          if (params.value === '0') {
            console.log(chalk.green('Allowance removed.'));
          } else {
            console.log(chalk.green('Allowance set.'));
          }
          spinner.stop();
          return;
        }
      } catch (err) {
        spinner.stop();
        throw new Error(`Error setting token allowance: ${err.message}`);
      }
    } catch (err) {
      throw new Error(`Error setting token allowance: ${err.message}`);
    }
  }

  public async wrapEther(amount: string) {
    const account = config.keyService.getAccount();
    const wethToken = await tokenPairService.getToken('WETH');
    await this.printBalances(wethToken);
    console.log(chalk.blueBright(`Wrapping Ether...`));
    const spinner = new Spinner('Pending...');
    const txHash = await web3service.etherToken.depositAsync(wethToken.address, new BigNumber(amount), account);

    try {
      const receipt = await web3service.getWeb3().awaitTransactionMinedAsync(txHash);
      if (receipt.status === 0) {
        spinner.stop();
        throw new Error(`wrap tx failed: see tx ${txHash} for more info`);
      }

      spinner.stop();
      console.log(chalk.green(`Conversion success.`));
      await this.printBalances(wethToken);
    } catch (err) {
      spinner.stop();
      throw new Error(`wrap tx couldn't be mined: ${err.message}`);
    }
  }

  public async unwrapEther(amount: string) {
    const account = config.keyService.getAccount();
    const wethToken = await tokenPairService.getToken('WETH');
    await this.printBalances(wethToken);
    console.log(chalk.blueBright(`Unwrapping Ether...`));
    const spinner = new Spinner('Pending...');
    const txHash = await web3service.etherToken.withdrawAsync(wethToken.address, new BigNumber(amount), account);

    try {
      const receipt = await web3service.getWeb3().awaitTransactionMinedAsync(txHash);
      if (receipt.status === 0) {
        spinner.stop();
        throw new Error(`unwrap tx failed: see tx ${txHash} for more info`);
      }

      spinner.stop();
      console.log(chalk.green(`Conversion success.`));
      await this.printBalances(wethToken);
    } catch (err) {
      spinner.stop();
      throw new Error(`unwrap tx couldn't be mined: ${err.message}`);
    }
  }

  private async printBalances(wethToken: ErcDex.Api.IToken) {
    const web3 = web3service;

    const account = config.keyService.getAccount();
    const [ethBalance, wethBalance] = await Promise.all([
      web3.getEthBalance(),
      web3.erc20Token.getBalanceAsync(wethToken.address, account)
    ]);

    const toUnitAmount = (base: BigNumber) => Web3Wrapper.toUnitAmount(base, 18).toString();
    console.log(chalk.blueBright(`ETH Balance: ${toUnitAmount(ethBalance)} (${ethBalance.toString()})`
      + `\nWETH Balance: ${toUnitAmount(wethBalance)} (${wethBalance.toString()})`));
  }
}
