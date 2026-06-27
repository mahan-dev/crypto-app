import { coinChart, coinSentiment } from "@/services/coingecko";
import type { MarketType } from "@/types/marketTypes";
import type { Dispatch, SetStateAction } from "react";
import type { DataProps } from "../coinsList/formattedData";
import type { CoinSentiment } from "@/types/coinTypes";

interface FetcherProps {
  CachedTypeCoin: MarketType["data"][number];
  setChart: Dispatch<SetStateAction<DataProps["data"] | null>>;
  setSentiment: Dispatch<SetStateAction<CoinSentiment | "">>;
}

const coinDetailFetcher = async ({
  CachedTypeCoin,
  setChart,
  setSentiment,
}: FetcherProps) => {
    console.log("working")
  await coinChart(CachedTypeCoin["id"]).then((res) => setChart(res));
  await coinSentiment(CachedTypeCoin["id"]).then((res) => setSentiment(res));
};

export { coinDetailFetcher };
