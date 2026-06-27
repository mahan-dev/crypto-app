import  { useState } from "react";

import styles from "@/components/templates/styles/coinDetails/route.module.css";
import CoinStatus from "./CoinStatus";
import type { Coin } from "./Chart";
import {
  formatPrice,
  ValueChecker,
} from "@/helper/coinDetails/coinValueChecker";

import type { MarketType } from "@/types/marketTypes";

interface CoinAsideProps {
  CachedTypeCoin: MarketType["data"][number];
  coinSymbol: Coin;
  coinName: string;
}
const CoinDetailAside = ({
  CachedTypeCoin,
  coinSymbol,
  coinName,
}: CoinAsideProps) => {
  const [show] = useState(() => document.body.offsetWidth > 1111);

  return (
    <div className={styles.container__left}>
      <div className="max-[1110px]:hidden min-[1111px]:visible">
        {show && (
          <CoinStatus coinSymbol={coinSymbol} coinName={coinName} show={show} />
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
            {`${ValueChecker(CachedTypeCoin["market_cap_change_percentage_24h"]).toFixed(2)} %`}
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

      <div className=" mt-5 ">
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
  );
};

export default CoinDetailAside;
