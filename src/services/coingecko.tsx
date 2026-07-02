import type { Days } from "@/components/modules/Chart";
import { apiConfig } from "@/configs/apiConfigs";
import { type DataProps } from "@/helper/coinsList/formattedData";
import type { CoinSentiment } from "@/types/coinTypes";
import type { MarketType } from "@/types/marketTypes";
import axios, { isAxiosError } from "axios";
import type { Dispatch, SetStateAction } from "react";

import { toast } from "sonner";

const BASE_URL = import.meta.env.VITE_BASE_URL;
const API_KEY = import.meta.env.VITE_API_KEY;

const positionToast = {
  position: "top-center",
} as const;

const getMarketList = async (
  currency: string,
  page: number,
): Promise<MarketType> => {
  try {
    const response = await apiConfig(
      `${BASE_URL}/coins/markets?vs_currency=${currency}&order=market_cap_desc&per_page=20&page=${page}&x-cg-demo-api-key:${API_KEY}&sparkline=false&price_change_percentage=24h`,
    );
    return response;
  } catch (error) {
    if (isAxiosError(error)) {
      if (error.response?.status === 429) {
        toast.error("too many requests", positionToast);
      }
      toast.error(error.message, positionToast);
    }
    return {
      status: 500,
      data: [],
    };
  }
};

const coinChart = async (
  coin: string,
  days: Days = 7, // 7 days
): Promise<DataProps["data"] | null> => {
  try {
    const res: DataProps = await apiConfig(
      `${BASE_URL}/coins/${coin}/market_chart?vs_currency=usd&days=${days}`,
    );
    return res.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      toast.error("something went wrong", positionToast);

      if (error.response?.status === 429)
        toast.error("too many requests", positionToast);
    }
    return null;
  }
};

type CoinType = MarketType["data"][number]["id"];
const coinSentiment = async (coin: CoinType): Promise<CoinSentiment> => {
  const { data } = await apiConfig<CoinSentiment>(
    `https://api.coingecko.com/api/v3/coins/${coin}`,
  );
  return data;
};

const coinWebsocket = (
  coin: string,
  setPrice: Dispatch<SetStateAction<number>>,
) => {
  const ws = new WebSocket(
    `wss://fstream.binance.com/market/ws/${coin}@aggTrade`,
  );

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
    console.log("websocket error", error);
  };

  ws.onclose = () => {
    toast.error("something went't wrong", positionToast);
  };

  return ws;
};

const fearAndGreedApi = async () => {
  const { data } = await axios("https://api.alternative.me/fng/");
  return data;
};
const altcoinSeasonApi = async () => {
  const URL =
    "https://pro-api.coinmarketcap.com/public-api/v1/altcoin-season-index/latest";

  const { data } = await axios(URL);

  return data.data.altcoin_index;
};

const cmc20TokenIndexApi = async (): Promise<DataProps["data"] | null> => {
  const URL =
    "/coins/coinmarketcap-20-index-dtf/market_chart?vs_currency=usd&days=360";

  const { data } = await apiConfig(URL);
  const result = data as DataProps["data"];

  return result;
};

const marketCapApi = async () => {
  const { data } = await apiConfig("/global");
  console.log(data);

  const res = data.data.total_market_cap.usd;
  return res;
};

const marketCapChartApi = async () => {
  const data = await axios("https://api.coinlore.net/api/global/");
  console.log(data);
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

const searchCoinApi = async (coin: string): Promise<SearchCoinProps> => {
  const { data } = await apiConfig(`/search?query=${coin}`);
  const dataType: SearchCoinProps = data;

  return dataType;
};

export {
  getMarketList,
  coinChart,
  coinWebsocket,
  coinSentiment,
  fearAndGreedApi,
  altcoinSeasonApi,
  cmc20TokenIndexApi,
  marketCapApi,
  marketCapChartApi,
  searchCoinApi,
};
