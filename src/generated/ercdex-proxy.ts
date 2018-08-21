/* tslint:disable */
import { ApiService, IAdditionalHeaders, IRequestParams } from '../api-service';

export namespace ErcDexProxy {
  export let baseApiUrl = 'http://localhost:8700';

  /**
   * Namespace representing REST API for ERC dEX
   */
  export namespace Api {

    export interface IOrder {
      /**
       * Unique Identifier
       */
      id: number;
      /**
       * Date of creation
       */
      dateCreated: Date;
      /**
       * Date of updated
       */
      dateUpdated: Date;
      /**
       * Date on which the order was closed through fill, cancel, etc
       */
      dateClosed?: Date;
      /**
       * 0x Exchange Contract Address
       */
      exchangeAddress: string;
      /**
       * Unix timestamp of order expiration (in seconds)
       */
      expirationTimeSeconds: string;
      /**
       * Address of the fee recipient
       */
      feeRecipientAddress: string;
      /**
       * Address of the order maker
       */
      makerAddress: string;
      /**
       * Fee due from maker on order fill
       */
      makerFee: string;
      /**
       * Token address of the maker token
       */
      makerAssetAddress: string;
      /**
       * Encoded maker asset data
       */
      makerAssetData: string;
      /**
       * Encoded taker asset data
       */
      takerAssetData: string;
      /**
       * Total amount of maker token in order
       */
      makerAssetAmount: string;
      /**
       * Secure salt
       */
      salt: string;
      /**
       * Serialized version of the EC signature for signed orders
       */
      signature: string;
      /**
       * Taker address; generally a null taker
       */
      takerAddress: string;
      /**
       * Fee due from taker on order fill
       */
      takerFee: string;
      /**
       * Token address of the taker token
       */
      takerAssetAddress: string;
      /**
       * Total amount of taker token in order
       */
      takerAssetAmount: string;
      /**
       * Remaining amount that can be filled in taker tokens
       */
      remainingFillableTakerAmount: string;
      /**
       * Remaining amount that can be filled in maker tokens
       */
      remainingFillableMakerAmount: string;
      /**
       * The hash of the signed order
       */
      orderHash: string;
      /**
       * Account ID of originator
       */
      accountId?: number;
      /**
       * State of the order: Open (0), Canceled (1), Filled (2), Expired(3), Removed(4)
       */
      state: number;
      price: string;
      senderAddress: string;
      system: boolean;
    }

    export interface ICreateOrderArgs {
      baseSymbol: string;
      quoteSymbol: string;
      side: string;
      quantity: string;
      price: string;
      expirationTimestamp: string;
    }

    export interface IFillReceiptLog {
      /**
       * Unique Identifier
       */
      id: number;
      /**
       * Date of creation
       */
      dateCreated: Date;
      /**
       * Date of updated
       */
      dateUpdated: Date;
      orderId: number;
      receiptId: number;
      takerAmount: string;
      makerAddress: string;
      isFeeOrder: boolean;
    }

    export interface IFillReceipt {
      /**
       * Unique Identifier
       */
      id: number;
      /**
       * Date of creation
       */
      dateCreated: Date;
      /**
       * Date of updated
       */
      dateUpdated: Date;
      txHash: string;
      taker: string;
      /**
       * Receipt status: success | error | pending
       */
      status: string;
      side: string;
      takerAmount: string;
      makerAmount: string;
      price: string;
      baseAssetAddress: string;
      baseSymbol: string;
      quoteSymbol: string;
      quoteAssetAddress: string;
      feeAmount: string;
      feeAssetAddress: string;
      logs: IFillReceiptLog[];
    }

    export interface IFillOrdersParams {
      data: any[];
    }


    export interface IAllowanceGetParams {
      tokenAddress: string;
    }

    export interface IAllowanceSetUnlimitedParams {
      tokenAddress: string;
    }

    export interface IAllowanceRemoveParams {
      tokenAddress: string;
    }

    export interface IAllowanceSetParams {
      tokenAddress: string;
      value: string;
    }

    export interface IOrderCreateParams {
      params: ICreateOrderArgs;
    }

    export interface IOrderCancelParams {
      orderHash: string;
    }

    export interface IOrderFillParams {
      request: IFillOrdersParams;
    }

    export interface IWalletGetBalanceParams {
      tokenAddress: string;
    }

    export interface IWalletWrapEtherParams {
      amount: string;
    }

    export interface IWalletUnwrapEtherParams {
      amount: string;
    }
    export interface IAllowanceService {

      get(params: IAllowanceGetParams, headers?: IAdditionalHeaders): Promise<string>;

      setUnlimited(params: IAllowanceSetUnlimitedParams, headers?: IAdditionalHeaders): Promise<void>;

      remove(params: IAllowanceRemoveParams, headers?: IAdditionalHeaders): Promise<void>;

      set(params: IAllowanceSetParams, headers?: IAdditionalHeaders): Promise<void>;
    }

    export class AllowanceService extends ApiService implements IAllowanceService {

      public async get(params: IAllowanceGetParams, headers?: IAdditionalHeaders) {
        const requestParams: IRequestParams = {
          method: 'GET',
          url: `${baseApiUrl}/api/wallet/allowances`
        };

        requestParams.queryParameters = {
          tokenAddress: params.tokenAddress,
        };
        return this.executeRequest<string>(requestParams, headers);
      }

      public async setUnlimited(params: IAllowanceSetUnlimitedParams, headers?: IAdditionalHeaders) {
        const requestParams: IRequestParams = {
          method: 'POST',
          url: `${baseApiUrl}/api/wallet/allowances/unlimited`
        };

        requestParams.queryParameters = {
          tokenAddress: params.tokenAddress,
        };
        return this.executeRequest<void>(requestParams, headers);
      }

      public async remove(params: IAllowanceRemoveParams, headers?: IAdditionalHeaders) {
        const requestParams: IRequestParams = {
          method: 'POST',
          url: `${baseApiUrl}/api/wallet/allowances/remove`
        };

        requestParams.queryParameters = {
          tokenAddress: params.tokenAddress,
        };
        return this.executeRequest<void>(requestParams, headers);
      }

      public async set(params: IAllowanceSetParams, headers?: IAdditionalHeaders) {
        const requestParams: IRequestParams = {
          method: 'POST',
          url: `${baseApiUrl}/api/wallet/allowances/set`
        };

        requestParams.queryParameters = {
          tokenAddress: params.tokenAddress,
          value: params.value,
        };
        return this.executeRequest<void>(requestParams, headers);
      }
    }
    export interface IOrderService {

      /**
       * Create a new order
       */
      create(params: IOrderCreateParams, headers?: IAdditionalHeaders): Promise<IOrder>;

      /**
       * Cancel an existing order
       */
      cancel(params: IOrderCancelParams, headers?: IAdditionalHeaders): Promise<string>;

      fill(params: IOrderFillParams, headers?: IAdditionalHeaders): Promise<IFillReceipt>;
    }

    export class OrderService extends ApiService implements IOrderService {

      /**
       * Create a new order
       */
      public async create(params: IOrderCreateParams, headers?: IAdditionalHeaders) {
        const requestParams: IRequestParams = {
          method: 'POST',
          url: `${baseApiUrl}/api/order/create`
        };

        requestParams.body = params.params;
        return this.executeRequest<IOrder>(requestParams, headers);
      }

      /**
       * Cancel an existing order
       */
      public async cancel(params: IOrderCancelParams, headers?: IAdditionalHeaders) {
        const requestParams: IRequestParams = {
          method: 'POST',
          url: `${baseApiUrl}/api/order/cancel/${params.orderHash}`
        };
        return this.executeRequest<string>(requestParams, headers);
      }

      public async fill(params: IOrderFillParams, headers?: IAdditionalHeaders) {
        const requestParams: IRequestParams = {
          method: 'POST',
          url: `${baseApiUrl}/api/order/fill`
        };

        requestParams.body = params.request;
        return this.executeRequest<IFillReceipt>(requestParams, headers);
      }
    }
    export interface IWalletService {

      getAccount(headers?: IAdditionalHeaders): Promise<string>;

      getBalance(params: IWalletGetBalanceParams, headers?: IAdditionalHeaders): Promise<string>;

      wrapEther(params: IWalletWrapEtherParams, headers?: IAdditionalHeaders): Promise<void>;

      unwrapEther(params: IWalletUnwrapEtherParams, headers?: IAdditionalHeaders): Promise<void>;

      getEtherBalance(headers?: IAdditionalHeaders): Promise<string>;
    }

    export class WalletService extends ApiService implements IWalletService {

      public async getAccount(headers?: IAdditionalHeaders) {
        const requestParams: IRequestParams = {
          method: 'GET',
          url: `${baseApiUrl}/api/wallet/account`
        };
        return this.executeRequest<string>(requestParams, headers);
      }

      public async getBalance(params: IWalletGetBalanceParams, headers?: IAdditionalHeaders) {
        const requestParams: IRequestParams = {
          method: 'GET',
          url: `${baseApiUrl}/api/wallet/balance`
        };

        requestParams.queryParameters = {
          tokenAddress: params.tokenAddress,
        };
        return this.executeRequest<string>(requestParams, headers);
      }

      public async wrapEther(params: IWalletWrapEtherParams, headers?: IAdditionalHeaders) {
        const requestParams: IRequestParams = {
          method: 'POST',
          url: `${baseApiUrl}/api/wallet/wrap_ether`
        };

        requestParams.queryParameters = {
          amount: params.amount,
        };
        return this.executeRequest<void>(requestParams, headers);
      }

      public async unwrapEther(params: IWalletUnwrapEtherParams, headers?: IAdditionalHeaders) {
        const requestParams: IRequestParams = {
          method: 'POST',
          url: `${baseApiUrl}/api/wallet/unwrap_ether`
        };

        requestParams.queryParameters = {
          amount: params.amount,
        };
        return this.executeRequest<void>(requestParams, headers);
      }

      public async getEtherBalance(headers?: IAdditionalHeaders) {
        const requestParams: IRequestParams = {
          method: 'GET',
          url: `${baseApiUrl}/api/wallet/ether_balance`
        };
        return this.executeRequest<string>(requestParams, headers);
      }
    }
  }
}
