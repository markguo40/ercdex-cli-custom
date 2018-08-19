import { ErcDex } from '@ercdex/core';
import { config } from '../config';
import { KeyService, KeyServiceInitializeParams } from '../services/key-service';

interface INetworkOption {
  label: string;
  host: string;
}

const networkOptions: INetworkOption[] = [
  { label: 'Mainnet - Production', host: 'api.ercdex.com' },
  { label: 'Kovan - Production', host: 'kovan-api.ercdex.com' },
  { label: 'Mainnet - Staging', host: 'staging-api.ercdex.com' },
  { label: 'Kovan - Staging', host: 'kovan-staging-api.ercdex.com' },
  { label: 'localhost (DEV)', host: 'localhost:8443' }
];

export const defaultPkEnv = 'ERCDEX_CLI_PK';

export const defaultParams = {
  network: {
    alias: 'n',
    description: 'ERC dEX Network',
    choices: networkOptions.map(o => o.host),
    default: networkOptions[0].host
  },
  pk: {
    description: 'Wallet private key'
  },
  pkenv: {
    description: 'Environment variable with wallet private key',
    default: defaultPkEnv
  },
  kstore: {
    description: 'Absolute path to a wallet key store (json)'
  },
  passphrase: {
    description: 'Key store passphrase (if using key store)'
  }
};

export const initializeConfig = async (args: any) => {
  const apiHost = args.network;

  let keyParams: KeyServiceInitializeParams;
  if (args.pk) {
    keyParams = {
      kind: 'pk',
      value: args.pk
    };
  } else if (args.kstore) {
    keyParams = {
      kind: 'store',
      path: args.kstore,
      passphrase: args.passphrase
    };
  } else {
    keyParams = {
      kind: 'pkenv',
      value: args.pkenv
    };
  }

  ErcDex.Initialize({ host: apiHost });

  config.keyService = new KeyService(keyParams);

  try {
    const network = await new ErcDex.Api.NetworksService().getSupportedNetwork({});
    config.network = network;
  } catch (err) {
    throw new Error(`Failed to connect to API server at host ${apiHost}`);
  }
};
