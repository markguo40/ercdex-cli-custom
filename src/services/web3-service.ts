import { ContractWrappers } from '0x.js';
import { PrivateKeyWalletSubprovider, RPCSubprovider } from '@0xproject/subproviders';
import { Web3Wrapper } from '@ercdex/core';
import { config } from '../config';

// tslint:disable-next-line
const ProviderEngine = require('web3-provider-engine');

export class Web3Service {
  private web3map: { [nodeUrl: string]: Web3Wrapper | undefined } = {};

  public static getInstance() {
    return new Web3Service();
  }

  protected constructor() { }

  public async getEthBalance() {
    const account = config.keyService.getAccount();
    return await this._getEthBalance(account);
  }

  public getWeb3() {
    const cachedWeb3 = this.web3map[config.network.url];
    if (cachedWeb3) {
      return cachedWeb3;
    }

    const provider = new ProviderEngine();

    if (!config.keyService.instance) {
      throw new Error('keyService not initialized');
    }

    const privateKey = config.keyService.instance.getPrivateKeyString();
    provider.addProvider(new PrivateKeyWalletSubprovider(privateKey.substring(2, privateKey.length)));
    provider.addProvider(new RPCSubprovider(config.network.url));
    provider.start();

    const web3 = this.web3map[config.network.url ] = new Web3Wrapper(provider);
    return web3;
  }

  public get erc20Token() {
    return this.contractWrappers().erc20Token;
  }

  public get etherToken() {
    return this.contractWrappers().etherToken;
  }

  private contractWrappers() {
    return new ContractWrappers(this.getWeb3().getProvider(), {
      networkId: config.network.id
    });
  }

  private async _getEthBalance(account: string) {
    return await this.getWeb3().getBalanceInWeiAsync(account);
  }
}

export let web3service = Web3Service.getInstance();
