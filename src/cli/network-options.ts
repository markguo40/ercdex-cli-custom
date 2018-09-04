export interface INetworkOption {
  label: string;
  host: string;
}

export const networkOptions: INetworkOption[] = [
  { label: 'Mainnet - Production', host: 'app.ercdex.com' },
  { label: 'Kovan - Production', host: 'kovan.ercdex.com' },
  { label: 'Mainnet - Staging', host: 'staging.ercdex.com' },
  { label: 'Kovan - Staging', host: 'kovan-staging.ercdex.com' },
  { label: 'localhost (DEV)', host: 'localhost:8443' }
];
