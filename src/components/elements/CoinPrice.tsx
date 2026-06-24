import { coinPairHandler } from "@/helper/coinsList/formattedData";

import { coinWebsocket } from "@/services/coingecko";
import type { MarketType } from "@/types/marketTypes";

import { useEffect, useState } from "react";
type Coin = MarketType["data"][number]["symbol"];

interface CoinProps {
  coin: Coin;
  boolean: boolean;
}
const CoinPrice = ({ coin, boolean }: CoinProps) => {
  const [price, setPrice] = useState(0);

  const coinDetailsFetcher = () => {
    if (!coin) return;

    const convertedCoin = coinPairHandler(coin);

    coinWebsocket(convertedCoin, setPrice);
  };
  useEffect(() => {
    if (!boolean) return;

    coinDetailsFetcher();
  }, []);

  return <p className="text-2xl font-medium">${price}</p>;
};

export default CoinPrice;
