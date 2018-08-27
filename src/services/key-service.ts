import * as fs from 'fs';
// tslint:disable-next-line
const wallet: IEthereumJsWallet = require('ethereumjs-wallet');

export interface IEthereumJsWallet {
  fromPrivateKey(buffer: Buffer): IWalletInstance;
  fromV3(keyfile: IKeyFile, passphrase: string): IWalletInstance;
}

export interface IWalletInstance {
  toV3(passphrase: string): IKeyFile;
  getPrivateKeyString(): string;
  getAddressString(): string;
}

export interface ICipherparams {
  iv: string;
}

export interface IKdfparams {
  dklen: number;
  salt: string;
  n: number;
  r: number;
  p: number;
}

export interface ICrypto {
  ciphertext: string;
  cipherparams: ICipherparams;
  cipher: string;
  kdf: string;
  kdfparams: IKdfparams;
  mac: string;
}

export interface IKeyFile {
  version: number;
  id: string;
  address: string;
  crypto: ICrypto;
}

export type KeyServiceInitializeParams = IPk | IPkEnv | IStoreFile;

export interface IPk {
  kind: 'pk';
  value: string;
}

export interface IPkEnv {
  kind: 'pkenv';
  value: string;
}

export interface IStoreFile {
  kind: 'store';
  path: string;
  passphrase: string;
}

export class KeyService {
  public instance: IWalletInstance | undefined;

  constructor(params: KeyServiceInitializeParams) {
    if (params.kind === 'pk') {
      try {
        this.instance = wallet.fromPrivateKey(Buffer.from(params.value, 'hex'));
      } catch (err) {
        throw new Error(`invalid private key: ${err.message}`);
      }
    } else if (params.kind === 'pkenv') {
      const pk = process.env[params.value];
      if (!pk) {
        throw new Error(`no environment variable value found for ${params.value}`);
      }

      try {
        this.instance = wallet.fromPrivateKey(Buffer.from(pk, 'hex'));
      } catch (err) {
        throw new Error(`invalid private key: ${err.message}`);
      }
    } else {
      try {
        const rawContent = fs.readFileSync(params.path).toString();
        const file = JSON.parse(rawContent) as IKeyFile;

        this.instance = wallet.fromV3(file, params.passphrase);
      } catch (err) {
        throw new Error(`invalid key store: ${err.message}`);
      }
    }
  }

  public getAccount() {
    if (!this.instance) {
      throw new Error('account not initialized');
    }

    return this.instance.getAddressString();
  }
}
