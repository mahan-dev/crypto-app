import type { MarketType } from "@/types/marketTypes";

import { useLocation, Navigate, useNavigate } from "react-router-dom";

import { useEffect, useState } from "react";
import UseCoin from "@/hooks/useCoin";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import CoinChart from "../modules/Chart";
import { coinChart, coinSentiment } from "@/services/coingecko";
import type { DataProps } from "@/helper/coinsList/formattedData";
import type { TypesCoin } from "@/components/modules/CoinsList";

import styles from "@/components/templates/styles/coinDetails/route.module.css";

import type { CoinSentiment } from "@/types/coinTypes";

import Loader from "../loader/Loader";
import CoinDetailAside from "../modules/coinDetailAside";
import Sentiment from "../modules/Sentiment";

export type Coin = MarketType["data"][number]["symbol"];
const CoinDetail = () => {
  const [chart, setChart] = useState<DataProps["data"] | null>(null);
  const [type, setType] = useState<TypesCoin>("prices");
  const [sentiment, setSentiment] = useState<CoinSentiment | "">("");

  const location = useLocation();
  const navigate = useNavigate();
  const coinName = location.pathname.split("/")[1];

  const { symbol, page, currency } = location.state;
  const coinSymbol = symbol as Coin;
  const queryClient = useQueryClient();
  const data: MarketType | undefined = queryClient.getQueryData([
    "crypto",
    page,
    currency,
  ]);

  const filterData = data?.data.find((item) => item.symbol === symbol);

  const { coin: cachedCoin, setCoin: setCachedCoin } = UseCoin();

  const CachedTypeCoin: MarketType["data"][number] = cachedCoin;

  const { isLoading, isError } = useQuery({
    queryKey: ["coin-details", CachedTypeCoin?.id],
    queryFn: async () => {
      const [chartData, sentimentData] = await Promise.all([
        coinChart(CachedTypeCoin["id"]).then((res) => setChart(res)),
        coinSentiment(CachedTypeCoin["id"]).then((res) => setSentiment(res)),
      ]);

      return { chartData, sentimentData };
    },
  });

  useEffect(() => {
    if (!filterData) return;

    setCachedCoin(filterData);
  }, [filterData]);

  if (!location.state) {
    return <Navigate to={"/"} replace />;
  }

  if (isError) navigate("/notFound");

  return (
    <section className={styles.container}>
      {isLoading && (
        <div className={styles.container__loader}>
          <Loader />
        </div>
      )}

      <CoinDetailAside
        CachedTypeCoin={CachedTypeCoin}
        coinSymbol={coinSymbol}
        coinName={coinName}
      />
      <div className={styles.container__main}>
        <CoinChart
          coin={CachedTypeCoin["name"]}
          chart={chart}
          setChart={setChart}
          type={type}
          setType={setType}
        />
        <div className={styles.sentiment}>
          <Sentiment sentiment={sentiment} />
        </div>
      </div>
    </section>
  );
};

export default CoinDetail;
