import { ErcDex } from '@ercdex/core';

export class TokenPairService {
  private tokenPairs?: ErcDex.Api.ITokenPair[];

  public async getTokenPairs() {
    if (this.tokenPairs) {
      return this.tokenPairs;
    }

    const tokenPairs = this.tokenPairs = (await new ErcDex.Api.AssetPairsService().get({})).records;
    return tokenPairs;
  }

  public async getToken(symbol: string) {
    const tokenPairs = await this.getTokenPairs();
    for (let tp of tokenPairs) {
      if (tp.assetDataA.symbol === symbol) {
        return tp.assetDataA;
      }

      if (tp.assetDataB.symbol === symbol) {
        return tp.assetDataB;
      }
    }

    throw new Error(`no token found with symbol ${symbol}`);
  }
}

export const tokenPairService = new TokenPairService();
