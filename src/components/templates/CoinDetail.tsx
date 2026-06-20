import { coinPairHandler } from "@/helper/coinsList/formattedData";
import { coinWebsocket } from "@/services/coingecko";
import type { MarketType } from "@/types/marketTypes";
import { useEffect, useState } from "react";

import { useLocation, Navigate } from "react-router-dom";

type Coin = MarketType["data"][number]["symbol"];
const CoinDetail = () => {
  const [price, setPrice] = useState(0);
  const location = useLocation();
  const coin = location.state as Coin;
  console.log(coin);

  const coinDetailsFetcher = async () => {
    console.log(coin);
    if (!coin) return;

    const convertedCoin = coinPairHandler(coin);

    const data = await coinWebsocket(convertedCoin, setPrice);
    console.log(data);
  };
  useEffect(() => {
    coinDetailsFetcher();
  }, []);

  if (coin === null) {
    return <Navigate to={"/"} replace />;
  }

  return <div>{coin } {price}</div>;
};

export default CoinDetail;
