import type { Days } from '@/components/modules/Chart';
import { apiConfig } from '@/configs/apiConfigs';
import { type DataProps } from '@/helper/coinsList/formattedData';
import type { CoinSentiment } from '@/types/coinTypes';
import type { CoinSchema, MarketType } from '@/types/marketTypes';
import axios, { isAxiosError } from 'axios';
import type { Dispatch, SetStateAction } from 'react';

import { toast } from 'sonner';

const BASE_URL = import.meta.env.VITE_BASE_URL;

const positionToast = {
  position: 'top-center',
} as const;

const getMarketList = async (currency: string = 'usd', page: number = 1): Promise<MarketType> => {
  try {
    const response = await apiConfig('/market', {
      params: {
        currency,
        page,
      },
    });

    // const rateLimit = response.data?.data?.status;

    // if (!Array.isArray(response.data.data) && (rateLimit.error_code as number) === 429) {
    //   toast.error('too many requests', positionToast);
    // }

    return response.data;
  } catch (error) {
    if (isAxiosError(error)) {
      const status = error.response?.status ?? 500;
      if (status === 429) {
        toast.error('too many requests', positionToast);
        return {
          status,
          data: [],
        };
      }
      toast.error(error.message, positionToast);
      return {
        status: 'Failed',
        data: [],
      };
    }
  }
  return {
    status: 500,
    data: [],
  };
};

const allMarketLists = async (currency: string = 'usd'): Promise<CoinSchema[]> => {
  const { data } = await apiConfig<CoinSchema[]>(
    `${BASE_URL}/coins/markets?vs_currency=${currency}`,
  );

  return data;
};

const coinChart = async (
  coin: string,
  days: Days = 7, // 7 days
): Promise<DataProps['data'] | null> => {
  try {
    const res: DataProps = await apiConfig(
      `${BASE_URL}/coins/${coin}/market_chart?vs_currency=usd&days=${days}`,
    );

    return res.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      // toast.error("something went wrong", positionToast);

      if (error.response?.status === 429) toast.error('too many requests', positionToast);
    }
    return null;
  }
};

type CoinType = CoinSchema['id'];
const coinSentiment = async (coin: CoinType): Promise<CoinSentiment> => {
  const { data } = await apiConfig<CoinSentiment>(`https://api.coingecko.com/api/v3/coins/${coin}`);
  return data;
};

const coinWebsocket = (coin: string, setPrice: Dispatch<SetStateAction<number>>) => {
  const ws = new WebSocket(`wss://fstream.binance.com/market/ws/${coin}@aggTrade`);

  ws.onopen = () => {
    // toast.success("connected to socket", positionToast);
  };

  ws.onmessage = (event) => {
    const data = JSON.parse(event.data);

    if (data.p) {
      setPrice(data.p);
    }
  };

  ws.onerror = (error) => {
    console.log('websocket error', error);
  };

  ws.onclose = () => {
    toast.error("something went't wrong", positionToast);
  };

  return ws;
};

const fearAndGreedApi = async () => {
  const { data } = await axios('https://api.alternative.me/fng/');
  return data;
};
const altCoinSeasonApi = async () => {
  const { data } = (await apiConfig('/altcoin-season')).data;

  const result = data.data.altcoin_index || null;

  return result;
};

const cmc20TokenIndexApi = async (): Promise<DataProps['data'] | null> => {
  const { data } = await apiConfig('/chart');

  const result = data.data as DataProps['data'];

  return result;
};

const marketCapChartApi = async () => {
  const data = await axios('https://api.coinlore.net/api/global/');

  return data;
};

export interface SearchCoinProps {
  coins: {
    api_symbol: string;
    id: string;
    large: string;
    name: string;
    symbol: string;
    thumb: string;
  }[];
}

const searchCoinApi = async (coin: string, signal?: AbortSignal): Promise<SearchCoinProps> => {
  const { data } = await apiConfig(`/search-query`, {
    params: {
      coin,
    },
    signal
  });

  const dataType: SearchCoinProps = data.data;

  return dataType;
};

export {
  getMarketList,
  coinChart,
  coinWebsocket,
  coinSentiment,
  fearAndGreedApi,
  altCoinSeasonApi,
  cmc20TokenIndexApi,
  marketCapChartApi,
  searchCoinApi,
  allMarketLists,
};
