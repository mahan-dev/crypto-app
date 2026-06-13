import { apiConfig } from "@/configs/apiConfigs";
import type { MarketType } from "@/types/marketTypes";

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
    
    if (errorType.status === 429) {
      toast.error("something went wrong");
      console.log(error.errorMessage)
    }
    return {
      status: 500,
      data: [],
    };
  }
};
export { getMarketList };
