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

  public async getTokenPair({ baseSymbol, quoteSymbol }: { baseSymbol: string; quoteSymbol: string }) {
    const tokenPairs = await this.getTokenPairs();

    const tp = tokenPairs.find(t => t.assetDataA.symbol === baseSymbol && t.assetDataB.symbol === quoteSymbol);
    if (!tp) {
      throw new Error(`token pair not found: ${baseSymbol}/${quoteSymbol}`);
    }

    return tp;
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
