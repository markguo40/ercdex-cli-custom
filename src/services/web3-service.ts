import { PrivateKeyWalletSubprovider } from '@0xproject/subproviders';
import { Web3Wrapper } from '@ercdex/core';
import { config } from '../config';

// tslint:disable-next-line
const ProviderEngine = require('web3-provider-engine');
// tslint:disable-next-line
const RpcSubprovider = require('web3-provider-engine/subproviders/rpc');

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

    const privateKey = config.keyService.instance.getPrivateKeyString();
    provider.addProvider(new PrivateKeyWalletSubprovider(privateKey.substring(2, privateKey.length)));
    provider.addProvider(new RpcSubprovider({ rpcUrl: config.network.url }));
    provider.start();

    const web3 = this.web3map[config.network.url ] = new Web3Wrapper(provider);
    return web3;
  }

  private async _getEthBalance(account: string) {
    return await this.getWeb3().getBalanceInWeiAsync(account);
  }
}

export let web3service = Web3Service.getInstance();
