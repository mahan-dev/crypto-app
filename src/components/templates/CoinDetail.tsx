import { coinPairHandler } from "@/helper/coinsList/formattedData";
import { coinWebsocket } from "@/services/coingecko";
import type { MarketType } from "@/types/marketTypes";
import { useEffect, useState } from "react";

import { useLocation, Navigate } from "react-router-dom";

import { useQueryClient } from "@tanstack/react-query";
import UseCoin from "@/hooks/useCoin";

type Coin = MarketType["data"][number]["symbol"];
const CoinDetail = () => {
  const [price, setPrice] = useState(0);
  const location = useLocation();
  const coinName = location.pathname.split("/")[1];

  const { symbol, page, currency } = location.state;
  const coin = symbol as Coin;

  const queryClient = useQueryClient();
  const data: MarketType | undefined = queryClient.getQueryData([
    "crypto",
    page,
    currency,
  ]);

  const { coin: cachedCoin, setCoin } = UseCoin();
  const filterData = data?.data.find((item) => item.symbol === symbol);
  console.log(cachedCoin);

  const coinDetailsFetcher = () => {
    if (!coin) return;

    const convertedCoin = coinPairHandler(coin);

    coinWebsocket(convertedCoin, setPrice);
  };

  useEffect(() => {
    if (!filterData) return;

    localStorage.setItem("crypto - detail", JSON.stringify(filterData));
  }, [filterData]);

  useEffect(() => {
    coinDetailsFetcher();
    setCoin(filterData);
  }, [setCoin]);

  if (coin === null) {
    return <Navigate to={"/"} replace />;
  }

  return (
    <section className="flex">
      <div className=" max-w-82.5 w-full border border-red-500">
        <span>
          {coinName.charAt(0).toUpperCase() + coinName.slice(1)} {coin}
        </span>
        <p>{price}</p>
      </div>
      <div className="w-full">{/* <CoinChart /> */}</div>
    </section>
  );
};

export default CoinDetail;
