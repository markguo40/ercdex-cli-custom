import { LimitOrder, SignerType } from '@ercdex/core';
import { BigNumber } from 'bignumber.js';
import { config } from '../../config';
import { IOrder } from '../../internal-aqueduct-types';
import { web3service } from '../web3-service';

export interface ICreateOrderArgs {
  baseSymbol: string;
  quoteSymbol: string;
  side: 'buy' | 'sell';
  quantity: string;
  price: string;
  expirationTimestamp: string;
}

export class CreateOrderService {
  public async create(params: ICreateOrderArgs): Promise<IOrder> {
    let expirationDate: Date | undefined = undefined;
    if (params.expirationTimestamp) {
      const parsedTimestamp = parseInt(params.expirationTimestamp, 10);
      if (isNaN(parsedTimestamp)) {
        throw new Error(`expirationDate invalid value: ${params.expirationTimestamp}`);
      }

      expirationDate = new Date(parsedTimestamp * 1000);
    }

    let price: BigNumber;
    try {
      price = new BigNumber(params.price);
    } catch {
      throw new Error(`Invalid price value: ${params.price}. Should be a float value.`);
    }

    let quantity: BigNumber;
    try {
      quantity = new BigNumber(params.quantity);
      if (!quantity.isInt()) {
        throw new Error(`Invalid quantity value: ${params.price}. Should be a float value.`);
      }
    } catch (err) {
      throw new Error(`Invalid quantity value: ${err.message}`);
    }

    try {
      return await new LimitOrder({
        provider: web3service.getWeb3().getProvider(),
        signerType: SignerType.Default,
        account: config.keyService.getAccount(),
        baseTokenSymbol: params.baseSymbol,
        quoteTokenSymbol: params.quoteSymbol,
        type: params.side,
        price,
        expirationDate,
        quantityInWei: params.quantity,
        shouldValidate: false
      }).execute();
    } catch (err) {
      throw new Error(`Failed to create order: ${err.message}`);
    }
  }
}
