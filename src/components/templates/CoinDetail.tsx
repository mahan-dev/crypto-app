import type { MarketType } from "@/types/marketTypes";

import { useLocation, Navigate } from "react-router-dom";

import CoinPrice from "../elements/CoinPrice";
import { useEffect, useState } from "react";
import UseCoin from "@/hooks/useCoin";
import { useQueryClient } from "@tanstack/react-query";
import CoinChart from "../modules/Chart";
import { coinChart } from "@/services/coingecko";
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
        <div className={styles.left__header}>
          <span className="flex items-center  gap-2 tex-[1.2rem] tracking-wide  font-medium line">
            <img
              className="rounded-full"
              src={CachedTypeCoin["image"]}
              width={25}
              height={25}
              alt="coin_image"
            />

            {coinName.charAt(0).toUpperCase() + coinName.slice(1)}
          </span>
          <span className=" text-[0.8rem] text-gray-400 uppercase">
            {coinSymbol}
          </span>
          <span className="text-[0.8rem] bg-gray-600 py-0.5 px-2 tracking-wide rounded-lg">
            {`#${ValueChecker(CachedTypeCoin["market_cap_rank"])} `}
          </span>
        </div>

        <CoinPrice coin={coinSymbol} />

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

            <div className="flex flex-col py-1 text-center border border-[#5b5b5b] rounded-md">
              <span className={styles.item__title}>FDV</span>
              {formatPrice(CachedTypeCoin["fully_diluted_valuation"])}
            </div>

            <div className="flex gap-2">
              <div className="flex flex-1 flex-col text-center border border-[#5b5b5b] rounded-md py-1">
                <span className={styles.item__title}>Total supply</span>
                {formatPrice(CachedTypeCoin["total_supply"])}
              </div>

              <div className="flex flex-1 flex-col text-center border border-[#5b5b5b] rounded-md py-1">
                <span className={styles.item__title}>Max supply</span>

                {formatPrice(CachedTypeCoin["max_supply"])}
              </div>
            </div>

            <div className="flex gap-2">
              <div className="flex flex-col flex-1 text-center border border-[#5b5b5b] rounded-md py-1">
                <span className={styles.item__title}>Circulating supply</span>
                {formatPrice(CachedTypeCoin["circulating_supply"])}
              </div>

              <div className="flex flex-col flex-1 text-center border border-[#5b5b5b] rounded-md py-1">
                <span className={styles.item__title}>Treasury Holdings</span>
                {formatPrice(CachedTypeCoin["circulating_supply"])}
              </div>
            </div>
          </div>

        <div className="fle mt-5 ">
          <p className="">Price Performance</p>

          <div className="flex justify-between">
            <span>
              Low:
              {CachedTypeCoin["atl"]}
            </span>
            <span>
              High:
              {CachedTypeCoin["ath"]}
            </span>
          </div>
        </div>
      </div>
      <div className="w-full">
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
