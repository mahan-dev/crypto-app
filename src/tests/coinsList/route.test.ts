import { currencyHandler, currencyList } from '@/helper/coinsList/currencyHandler';
import {
  coinPriceSorting,
  PriceCommaFormatter,
  symbolFormatter,
} from '@/helper/coinsList/formattedData';
import { statusHelperHandler } from '@/helper/coinsList/statusHandlerHelper';
import type { MarketType } from '@/types/marketTypes';
import { describe, it, expect, vitest } from 'vitest';


describe(' test currency', () => {
  it.each([
    ['usd', currencyList.usd],
    ['eur', currencyList.eur],
    ['gbp', currencyList.gbp],
  ] as const)('should check Currency', (currency, symbol) => {
    expect(currencyHandler(123.23, currency)).toBe(`${symbol}123`);
  });
});

describe('priceCommaFormatter', () => {
  it('should validate the param', () => {
    expect(+PriceCommaFormatter(23.23)).toBe(23);
  });
});

describe('symbolFormatter', () => {
  it('should return UpperCase form before _', () => {
    expect(symbolFormatter('btc_usdt')).toBe('BTC');
  });
});

const mockedData = [
  {
    id: 'bitcoin',
    symbol: 'btc',
    name: 'Bitcoin',
    image: '',
    market_cap: 100000,
    market_cap_rank: 1,
    current_price: 30000,
    circulating_supply: 100,
    market_cap_change_percentage_24h: 5,
    fully_diluted_valuation: 0,
    total_volume: 0,
    total_supply: 0,
    max_supply: 0,
    ath: 0,
    atl: 0,
  },
  {
    id: 'ethereum',
    symbol: 'eth',
    name: 'Ethereum',
    image: '',
    market_cap: 50000,
    market_cap_rank: 2,
    current_price: 2000,
    circulating_supply: 200,
    market_cap_change_percentage_24h: -2,
    fully_diluted_valuation: 0,
    total_volume: 0,
    total_supply: 0,
    max_supply: 0,
    ath: 0,
    atl: 0,
  },
] satisfies MarketType['data'];

describe('coinPriceSorting', () => {
  it('should sort ascending', () => {
    const result = coinPriceSorting(mockedData, 'up', 'price');
    expect(result[0].id).toBe('ethereum');
    expect(result[1].id).toBe('bitcoin');
  });

  it('should sort descending', () => {
    const result = coinPriceSorting(mockedData, 'down', 'price');
    expect(result[0].id).toBe('bitcoin');
    expect(result[1].id).toBe('ethereum');
  });

  // it('returns the original order for an unsupported sort field', () => {
  //   const result = coinPriceSorting(
  //     mockedData,
  //     'down',
  //     'unknown' as SortField,
  //   );

  //   expect(result).toEqual(mockedData);
  // });
});

describe('status helper test', () => {
  it('should test the status helper', () => {
    const setSortOrder = vitest.fn();
    const setSortField = vitest.fn();

    statusHelperHandler('price', 'price', setSortOrder, setSortField);

    expect(setSortOrder).toHaveBeenCalledTimes(1);
    expect(setSortField).not.toHaveBeenCalled();

    const clickSort = setSortOrder.mock.calls[0][0];

    expect(clickSort('default')).toBe('down');
    expect(clickSort('down')).toBe('up');
    expect(clickSort('up')).toBe('default');
  });
});
