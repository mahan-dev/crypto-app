import { describe, expect, it } from 'vitest';
import { allMarketLists, coinChart, getMarketList } from '@/services/coingecko';
import { marketSchema, coinSchema } from '@/types/marketTypes';
import { z } from 'zod';
import { CoinInfo } from '@/helper/coinsList/formattedData';

describe('testing api result', () => {
  // ! getMarketList api
  it('should test getMarketList api', async () => {
    const result = await getMarketList('usd', 1);
    expect(() => marketSchema.parse(result)).not.toThrow();
  });

  // ? allMarketLists

  it('should test allMarketLists ', async () => {
    const result = await allMarketLists('usd');

    expect(() => z.array(coinSchema).parse(result)).not.toThrow();
  });

  //! CoinChart

  it("test's a coin chart api", async () => {
    const res = await coinChart('bitcoin', 7);

    expect(res).not.toBeNull();
    expect(res).not.toEqual({});
    expect(Array.isArray(res)).toBe(false);

    expect(() => CoinInfo.parse(res)).not.toThrow();
  });
});
