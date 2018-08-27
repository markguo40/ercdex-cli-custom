export interface INetworkOption {
  label: string;
  host: string;
}

export const networkOptions: INetworkOption[] = [
  { label: 'Mainnet - Production', host: 'api.ercdex.com' },
  { label: 'Kovan - Production', host: 'kovan-api.ercdex.com' },
  { label: 'Mainnet - Staging', host: 'staging-api.ercdex.com' },
  { label: 'Kovan - Staging', host: 'kovan-staging-api.ercdex.com' },
  { label: 'localhost (DEV)', host: 'localhost:8443' }
];
