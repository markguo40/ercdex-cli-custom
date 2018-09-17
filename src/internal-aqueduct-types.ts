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

export interface IToken {
  name: string;
  address: string;
  symbol: string;
  decimals: number;
}

export interface ITokenPair {
  assetDataA: IToken;
  assetDataB: IToken;
  minimumQuantity: string;
  priceDecimals: number;
  baseVolume: string;
  quoteVolume: string;
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
  baseAssetAddress: string;
  baseSymbol: string;
  quoteSymbol: string;
  quoteAssetAddress: string;
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
  makerAddress: string;
  side: string;
  takerAmount: string;
  makerAmount: string;
  price: string;
  isFeeOrder: boolean;
}
