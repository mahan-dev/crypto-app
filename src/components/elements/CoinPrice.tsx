import { coinPairHandler } from "@/helper/coinsList/formattedData";
import UseCoin from "@/hooks/useCoin";
import { coinWebsocket } from "@/services/coingecko";
import type { MarketType } from "@/types/marketTypes";
import { useQueryClient } from "@tanstack/react-query";
import { useEffect, useState } from "react";
type Coin = MarketType["data"][number]["symbol"];

interface CoinProps {
  coin: Coin;
  symbol: string;
  page: string;
  currency: string;
}
const CoinPrice = ({ coin, symbol, page, currency }: CoinProps) => {
  const [price, setPrice] = useState(0);

  const queryClient = useQueryClient();
  const data: MarketType | undefined = queryClient.getQueryData([
    "crypto",
    page,
    currency,
  ]);

  const { coin: cachedCoin, setCoin } = UseCoin();
  const filterData = data?.data.find((item) => item.symbol === symbol);
  const CachedTypeCoin: MarketType["data"][number] = cachedCoin;
  
  console.log("🏝️ ~ CoinPrice.tsx:27 -> CachedTypeCoin: ", CachedTypeCoin);

  const coinDetailsFetcher = () => {
    if (!coin) return;

    const convertedCoin = coinPairHandler(coin);

    coinWebsocket(convertedCoin, setPrice);
  };
  useEffect(() => {
    coinDetailsFetcher();

    if (!filterData) return;
    setCoin(filterData);
  }, [filterData]);
  return (
    <div>
      {price}
      <br />
      rank : {CachedTypeCoin?.market_cap_rank ?? "N/A"}
    </div>
  );
};

export default CoinPrice;
