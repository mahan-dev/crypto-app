import type { MarketType } from "@/types/marketTypes";

import { useParams } from "react-router-dom";

import { useState } from "react";

import { useQuery } from "@tanstack/react-query";
import CoinChart from "../modules/Chart";
import { allMarketLists, coinChart, coinSentiment } from "@/services/coingecko";
import type { DataProps } from "@/helper/coinsList/formattedData";
import type { TypesCoin } from "@/types/coinsList/coinListTypes";

import styles from "@/components/templates/styles/coinDetails/route.module.css";

import type { CoinSentiment } from "@/types/coinTypes";

import Loader from "../loader/Loader";
import CoinDetailAside from "../modules/coinDetailAside";
import Sentiment from "../modules/Sentiment";
import { useErrorRedirect } from "@/hooks/useErrorRedirect";

export type Coin = MarketType["data"][number]["symbol"];
const CoinDetail = () => {
  const [chart, setChart] = useState<DataProps["data"] | null>(null);
  const [type, setType] = useState<TypesCoin>("prices");
  const [sentiment, setSentiment] = useState<CoinSentiment | "">("");

  const { coinId } = useParams();

  const { data: allCoins, isError } = useQuery({
    queryKey: ["allCoins"],
    queryFn: async () => await allMarketLists(),
  });

  const filterData = allCoins?.data.find(
    (item) => item.id === coinId,
  ) as MarketType["data"][number];

  const { isLoading } = useQuery({
    queryKey: ["coin-details", coinId],
    queryFn: async () => {
      const [chartData, sentimentData] = await Promise.all([
        coinChart(coinId ?? ""),
        coinSentiment(coinId ?? ""),
      ]);
      setChart(chartData ?? null);
      setSentiment(sentimentData ?? null);
    },
  });

  useErrorRedirect(isError);

  return (
    <section className={styles.container}>
      {isLoading && (
        <div className={styles.container__loader}>
          <Loader />
        </div>
      )}
      {!!filterData && (
        <CoinDetailAside
          CachedTypeCoin={filterData}
          coinSymbol={filterData.symbol}
          coinName={filterData.name}
        />
      )}
      <div className={styles.container__main}>
        {!isLoading && !!filterData && (
          <CoinChart
            coinSymbol={filterData.symbol}
            coinName={filterData.name}
            coin={filterData.name ?? ""}
            chart={chart}
            setChart={setChart}
            type={type}
            setType={setType}
            coinId={filterData.id}
            filteredData={filterData}
          />
        )}
        <div className={styles.sentiment}>
          <Sentiment sentiment={sentiment} />
        </div>
      </div>
    </section>
  );
};

export default CoinDetail;
