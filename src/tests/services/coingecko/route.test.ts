import { afterEach, describe, expect, it, vi } from 'vitest';
import { allMarketLists, coinChart, coinWebsocket, getMarketList } from '@/services/coingecko';
import { marketSchema, coinSchema } from '@/types/marketTypes';
import { z } from 'zod';
import { CoinInfo } from '@/helper/coinsList/formattedData';

vi.mock('@/services/coingecko', async (importOriginal) => {
  const actual = await importOriginal<typeof import('@/services/coingecko')>();

  return {
    ...actual,
    coinChart: vi.fn(() => ({
      prices: [[1720000000000, 65000]],
      market_caps: [[1720000000000, 1_200_000_000_000]],
      total_volumes: [[1720000000000, 25_000_000_000]],
    })),
  };
});
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

  it("test's a coin chart api", () => {
    const res = coinChart('bitcoin', 7);
    expect(coinChart).toHaveBeenCalledWith('bitcoin', 7);
    expect(res).not.toBeNull();
    expect(res).not.toEqual({});
    expect(Array.isArray(res)).toBe(false);

    expect(() => CoinInfo.parse(res)).not.toThrow();
  });

  // ? coinSentiment

  it("test's coinSentiment api", async () => {
    const mockSentiment = {
      sentiment_votes_up_percentage: 42,
      sentiment_votes_down_percentage: 90,
    };

    const coinSentiment = vi.fn().mockResolvedValue(mockSentiment);

    const res = await coinSentiment();

    expect(res).toEqual(mockSentiment);
    expect(coinSentiment).toHaveBeenCalledOnce();
    expect(coinSentiment).toHaveReturned();
  });

  describe('coinWebsocket', () => {
    afterEach(() => {
      vi.unstubAllGlobals();
      vi.restoreAllMocks();
    });

    it('should create a WebSocket with the correct URL', () => {
      const mockSocket = {
        onopen: null,
        onmessage: null,
        onerror: null,
        onclose: null,
      };

      const mockWebSocket = vi.fn(function () {
        return mockSocket;
      });

      vi.stubGlobal('WebSocket', mockWebSocket);

      const setPrice = vi.fn();

      coinWebsocket('btcusdt', setPrice);

      expect(mockWebSocket).toHaveBeenCalledOnce();
      expect(mockWebSocket).toHaveBeenCalledWith(
        'wss://fstream.binance.com/market/ws/btcusdt@aggTrade',
      );
    });
  });
});
