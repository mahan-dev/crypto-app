import type { MarketType } from "@/types/marketTypes";

import { useLocation, Navigate } from "react-router-dom";

import CoinPrice from "../elements/CoinPrice";

type Coin = MarketType["data"][number]["symbol"];
const CoinDetail = () => {
  const location = useLocation();
  const coinName = location.pathname.split("/")[1];

  const { symbol, page, currency } = location.state;
  const coin = symbol as Coin;

  if (coin === null) {
    return <Navigate to={"/"} replace />;
  }

  return (
    <section className="flex">
      <div className=" max-w-82.5 w-full border border-red-500">
        <span>
          {coinName.charAt(0).toUpperCase() + coinName.slice(1)} {coin}
        </span>
      
        <CoinPrice
          coin={coin}
          symbol={symbol}
          page={page}
          currency={currency}
        />
      </div>
      <div className="w-full">{/* <CoinChart /> */}</div>
    </section>
  );
};

export default CoinDetail;
