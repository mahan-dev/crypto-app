import { apiConfig } from "@/configs/apiConfigs";
import type { DataProps } from "@/helper/coinsList/formattedData";
import type { MarketType } from "@/types/marketTypes";
import { isAxiosError } from "axios";
import type { Dispatch, SetStateAction } from "react";

import { toast } from "sonner";

const BASE_URL = import.meta.env.VITE_BASE_URL;
const API_KEY = import.meta.env.VITE_API_KEY;

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
        toast.error("something went wrong");
        console.log(error.errorMessage);
      }
    }
    return {
      status: 500,
      data: [],
    };
  }
};

const coinChart = async (
  coin: string,
  setLoading: Dispatch<SetStateAction<boolean>>,
): Promise<DataProps["data"] | null> => {
  try {
    const res: DataProps = await apiConfig(
      `${BASE_URL}/coins/${coin}/market_chart?vs_currency=usd&days=7`,
    );
    return res.data;
  } catch (error) {
    console.log("something wen't wrong", error);

    if (error.status === 429) {
      toast.error(error.errorMessage);
    }
    return null;
  } finally {
    setLoading(false);
  }
};

export { getMarketList, coinChart };
