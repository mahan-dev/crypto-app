import type { MarketType } from "@/types/marketTypes";

import { useLocation, Navigate } from "react-router-dom";

import CoinPrice from "../elements/CoinPrice";
import { use, useEffect, useState } from "react";
import UseCoin from "@/hooks/useCoin";
import { useQueryClient } from "@tanstack/react-query";
import CoinChart from "../modules/Chart";
import { coinChart, coinWebsocket } from "@/services/coingecko";
import type { DataProps } from "@/helper/coinsList/formattedData";
import type { TypesCoin } from "@/components/modules/CoinsList";
import {
  formatPrice,
  ValueChecker,
} from "@/helper/coinDetails/coinValueChecker";

import styles from "@/components/templates/styles/coinDetails/route.module.css";

type Coin = MarketType["data"][number]["symbol"];
const CoinDetail = () => {
  const [chart, setChart] = useState<DataProps["data"] | null>(null);
  const [type, setType] = useState<TypesCoin>("prices");
  
  const [show] = useState(() => document.body.offsetWidth > 1111)
  

  const location = useLocation();
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

  const chartFetcher = async () => {
    await coinChart(CachedTypeCoin["id"]).then((res) => setChart(res));
  };

  


  useEffect(() => {
    chartFetcher();
    if (!filterData) return;

    setCachedCoin(filterData);
  }, [filterData]);

  if (coinSymbol === null) {
    return <Navigate to={"/"} replace />;
  }

  return (
    <section className={styles.container}>
      <div className={styles.container__left}>
        <div className="max-[1110px]:hidden">
          <div className={styles.left__header}>
            <div className={styles.header__coin}>
              <span className={styles.coin__image}>
                <img
                  className="rounded-full"
                  src={CachedTypeCoin["image"]}
                  width={25}
                  height={25}
                  alt="coin_image"
                />

                {coinName.charAt(0).toUpperCase() + coinName.slice(1)}
              </span>
              <span className={styles.coin__symbol}>{coinSymbol}</span>
              <span className={styles["coin__market-cap"]}>
                {`#${ValueChecker(CachedTypeCoin["market_cap_rank"])} `}
              </span>
            </div>
          </div>
          <CoinPrice coin={coinSymbol} boolean={show} />
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
    </section>
  );
};

export default CoinDetail;
