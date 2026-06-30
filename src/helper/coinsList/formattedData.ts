import type { MarketType } from "@/types/marketTypes";

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
  return symbol.split("_")[0].toUpperCase();
};

export interface DataProps {
  data: {
    market_caps: [number, number][];
    prices: [number, number][];
    total_volumes: [number, number][];
  };
}

export interface DataResponse {
  date: string;
  prices: number;
}

const convertedData = (
  data: DataProps["data"],
  type: "prices" | "market_caps" | "total_volumes",
): DataResponse[] => {
  return data[type].map((item) => ({
    date: new Date(item[0]).toLocaleString(),
    prices: item[1],
  }));
};

const coinPairHandler = (coin: MarketType["data"][number]["id"]) => {
  return coin === "usdt" ? `${coin}usd` : `${coin}usdt`;
};

export {
  priceFormatter,
  PriceCommaFormatter,
  symbolFormatter,
  convertedData,
  coinPairHandler,
};
