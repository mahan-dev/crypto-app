import type { MarketType } from "@/types/marketTypes";

import { useLocation, Navigate } from "react-router-dom";

type Coin = MarketType["data"][number];
const CoinDetail = () => {
  const location = useLocation();
  const coin = location.state as Coin | undefined;

  if (coin === null) {
    return <Navigate to={"/"} replace />;
  }

  return <div>Coin page</div>;
};

export default CoinDetail;
