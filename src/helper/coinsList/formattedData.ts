import type { SortOrder, SortField } from '@/types/coinsList/coinListTypes';
import type { CoinSchema } from '@/types/marketTypes';
import { z } from 'zod';

export const DataPropsZod = z.object({
  data: z.object({
    market_caps: z.array(z.tuple([z.number(), z.number()])),
    prices: z.array(z.tuple([z.number(), z.number()])),
    total_volumes: z.array(z.tuple([z.number(), z.number()])),
  }),
});
export type DataProps = z.infer<typeof DataPropsZod>;

export const CoinInfo = z.object({
  market_caps: z.array(z.tuple([z.number(), z.number()])),
  prices: z.array(z.tuple([z.number(), z.number()])),
  total_volumes: z.array(z.tuple([z.number(), z.number()])),
});

export type CoinInfoZod = z.infer<typeof CoinInfo>;

export const DataResponseZod = z.object({
  date: z.string(),
  prices: z.number(),
});

export type DataResponse = z.infer<typeof DataResponseZod>;

const priceFormatter = (price: number): string => {
  return (price / 1000000).toLocaleString(undefined, {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  });
};

const PriceCommaFormatter = (number: number): string => {
  return number.toLocaleString(undefined, {
    maximumFractionDigits: 0,
  });
};

const symbolFormatter = (symbol: string) => {
  return symbol.split('_')[0].toUpperCase();
};

const convertedData = (
  data: DataProps['data'],
  type: 'prices' | 'market_caps' | 'total_volumes',
): DataResponse[] => {
  return data[type].map((item) => ({
    date: new Date(item[0]).toLocaleString(),
    prices: item[1],
  }));
};

const coinPairHandler = (coin: CoinSchema['id']) => {
  return coin === 'usdt' ? `${coin}usd` : `${coin}usdt`;
};

const coinPriceSorting = (data: CoinSchema[], priceStatus: SortOrder, sortField: SortField) => {
  const sorted = [...data];

  if (sortField === 'price') {
    if (priceStatus === 'down') {
      return sorted.sort((a, b) => b.current_price - a.current_price);
    } else if (priceStatus === 'up') {
      return sorted.sort((a, b) => a.current_price - b.current_price);
    } else return sorted;
  }
  if (sortField === '24h') {
    if (priceStatus === 'down') {
      return sorted.sort(
        (a, b) => b.market_cap_change_percentage_24h - a.market_cap_change_percentage_24h,
      );
    } else if (priceStatus === 'up') {
      return sorted.sort(
        (a, b) => a.market_cap_change_percentage_24h - b.market_cap_change_percentage_24h,
      );
    } else return sorted;
  }

  if (sortField === 'market_cap') {
    if (priceStatus === 'down') {
      return sorted.sort((a, b) => b.market_cap - a.market_cap);
    } else if (priceStatus === 'up') {
      return sorted.sort((a, b) => a.market_cap - b.market_cap);
    } else return sorted;
  }

  if (sortField === 'circulating_supply') {
    if (priceStatus === 'down') {
      return sorted.sort((a, b) => b.circulating_supply - a.circulating_supply);
    } else if (priceStatus === 'up') {
      return sorted.sort((a, b) => a.circulating_supply - b.circulating_supply);
    } else return sorted;
  }

  return sorted;
};

export {
  priceFormatter,
  PriceCommaFormatter,
  symbolFormatter,
  convertedData,
  coinPairHandler,
  coinPriceSorting,
};
