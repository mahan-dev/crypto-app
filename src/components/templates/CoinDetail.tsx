import type { MarketType } from "@/types/marketTypes";

import { useLocation, Navigate } from "react-router-dom";

import { useEffect, useState } from "react";
import UseCoin from "@/hooks/useCoin";
import { useQueryClient } from "@tanstack/react-query";
import CoinChart from "../modules/Chart";
import { coinChart, coinSentiment } from "@/services/coingecko";
import type { DataProps } from "@/helper/coinsList/formattedData";
import type { TypesCoin } from "@/components/modules/CoinsList";
import { formatPrice } from "@/helper/coinDetails/coinValueChecker";

import styles from "@/components/templates/styles/coinDetails/route.module.css";
import CoinStatus from "../modules/CoinStatus";
import WinLossBar from "../elements/SentimentGraph";
import type { CoinSentiment } from "@/types/coinTypes";

import { VscDashboard } from "react-icons/vsc";

type Coin = MarketType["data"][number]["symbol"];
const CoinDetail = () => {
  const [chart, setChart] = useState<DataProps["data"] | null>(null);
  const [type, setType] = useState<TypesCoin>("prices");
  const [sentiment, setSentiment] = useState<CoinSentiment>();
  console.log(sentiment);

  const [show] = useState(() => document.body.offsetWidth > 1111);

  const location = useLocation();
  const coinName = location.pathname.split("/")[1];

  const { symbol, page, currency } = location.state;
  const coinSymbol = symbol as Coin;
  console.log(coinSymbol);

  const queryClient = useQueryClient();
  const data: MarketType | undefined = queryClient.getQueryData([
    "crypto",
    page,
    currency,
  ]);

  const filterData = data?.data.find((item) => item.symbol === symbol);

  const { coin: cachedCoin, setCoin: setCachedCoin } = UseCoin();

  const CachedTypeCoin: MarketType["data"][number] = cachedCoin;

  const coinDetailFetcher = async () => {
    await coinChart(CachedTypeCoin["id"]).then((res) => setChart(res));
    await coinSentiment(CachedTypeCoin["id"]).then((res) => setSentiment(res));
  };

  useEffect(() => {
    coinDetailFetcher();
    if (!filterData) return;

    setCachedCoin(filterData);
  }, [filterData]);

  if (!location.state) {
    return <Navigate to={"/"} replace />;
  }

  return (
    <section className={styles.container}>
      <div className={styles.container__left}>
        <div className="max-[1110px]:hidden min-[1111px]:visible">
          {show && (
            <CoinStatus
              coinSymbol={coinSymbol}
              coinName={coinName}
              show={show}
            />
          )}
        </div>

        <div className={styles.left__body}>
          <div className={styles.body__item}>
            <span className={styles.item__title}>Market cap</span>
            {formatPrice(CachedTypeCoin["market_cap"])}
          </div>

          <div className={styles.body__grouped}>
            <div className={styles.grouped__item}>
              <span className={styles.item__title}>Volume (24h)</span>
              {formatPrice(CachedTypeCoin["total_volume"])}
            </div>

            <div className={styles.grouped__item}>
              <span className={styles.item__title}>Vol/Mkt Cap (24h)</span>
              {CachedTypeCoin["market_cap_change_percentage_24h"].toFixed(2)}
            </div>
          </div>

          <div className={styles.grouped__item}>
            <span className={styles.item__title}>FDV</span>
            {formatPrice(CachedTypeCoin["fully_diluted_valuation"])}
          </div>

          <div className={styles.body__grouped}>
            <div className={styles.grouped__item}>
              <span className={styles.item__title}>Total supply</span>
              {formatPrice(CachedTypeCoin["total_supply"])}
            </div>

            <div className={styles.grouped__item}>
              <span className={styles.item__title}>Max supply</span>

              {formatPrice(CachedTypeCoin["max_supply"])}
            </div>
          </div>

          <div className={styles.body__grouped}>
            <div className={styles.grouped__item}>
              <span className={styles.item__title}>Circulating supply</span>
              {formatPrice(CachedTypeCoin["circulating_supply"])}
            </div>

            <div className={styles.grouped__item}>
              <span className={styles.item__title}>Treasury Holdings</span>
              {formatPrice(CachedTypeCoin["circulating_supply"])}
            </div>
          </div>
        </div>

        <div className="fle mt-5 ">
          <p className=" w-full flex justify-between">
            <span>All-time high: </span>
            {CachedTypeCoin["ath"].toFixed(2)}
          </p>
          <p className=" w-full flex justify-between">
            <span>All-time low:</span>
            {CachedTypeCoin["atl"].toFixed(2)}
          </p>
        </div>
      </div>
      <div className={styles.container__right}>
        <CoinChart
          coin={CachedTypeCoin["name"]}
          chart={chart}
          setChart={setChart}
          type={type}
          setType={setType}
        />
      </div>
      <div>
        {sentiment && (
          <div className="flex flex-col w-82.5 p-3 gap-2">
            <span className="flex items-center gap-1.5">
              <VscDashboard className="text-[1.3rem]" /> Community sentiment
            </span>
            <WinLossBar
              sentimentUp={sentiment.sentiment_votes_up_percentage}
              sentimentDown={sentiment.sentiment_votes_down_percentage}
            />
          </div>
        )}
      </div>
    </section>
  );
};

export default CoinDetail;
