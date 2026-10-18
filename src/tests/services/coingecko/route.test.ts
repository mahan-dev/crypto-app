import { describe, expect, it } from 'vitest';
import { allMarketLists, getMarketList } from '@/services/coingecko';
import { marketSchema, coinSchema } from '@/types/marketTypes';
import z from 'zod';

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
});
