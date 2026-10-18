import { describe, expect, it, vi } from 'vitest';
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

  // ? coinSentiment

  const mockSentiment = {
    sentiment_votes_up_percentage: 42,
    sentiment_votes_down_percentage: 90,
  };

  const coinSentiment = vi.fn().mockResolvedValue(mockSentiment);

  it("test's coinSentiment api", async () => {
    const res = await coinSentiment();
    // expect(res).toHaveBeenCalled();
    expect(res).toEqual(mockSentiment);
    expect(coinSentiment).toHaveBeenCalledOnce();
    expect(coinSentiment).toHaveReturned();
    // expect(coinSentiment).instanceof({});
  });
});
