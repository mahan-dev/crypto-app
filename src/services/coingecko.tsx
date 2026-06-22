import { apiConfig } from "@/configs/apiConfigs";
import type { DataProps } from "@/helper/coinsList/formattedData";
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
      toast.error(error.message, positionToast);
    }
    return {
      status: 500,
      data: [],
    };
  }
};

const coinChart = async (coin: string): Promise<DataProps["data"] | null> => {
  try {
    const res: DataProps = await apiConfig(
      `${BASE_URL}/coins/${coin}/market_chart?vs_currency=usd&days=7`,
    );
    return res.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      toast.error("something went wrong", positionToast);

      if (error.response?.status === 429)
        toast.error(error.message, positionToast);
    }
    return null;
  }
};

const coinWebsocket = (
  price: string,
  setPrice: Dispatch<SetStateAction<number>>,
) => {
  const ws = new WebSocket(
    `wss://fstream.binance.com/market/ws/${price}@aggTrade`,
  );

  ws.onopen = () => {
    console.log("Connected to Binance Live Price WebSocket");
  };

  ws.onmessage = (event) => {
    const data = JSON.parse(event.data);

    // 'p' is the actual last traded price of the coin
    if (data.p) {
      setPrice(data.p);
    }
  };

  ws.onerror = (error) => {
    console.log("WebSocket error:", error);
  };

  ws.onclose = () => {
    console.log("Disconnected");
  };

  return ws;
};

export { getMarketList, coinChart, coinWebsocket };
