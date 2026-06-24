import styles from "@/components/modules/css/route.module.css";
import { ValueChecker } from "@/helper/coinDetails/coinValueChecker";
import type { Coin } from "./Chart";
import UseCoin from "@/hooks/useCoin";
import type { MarketType } from "@/types/marketTypes";
import { useState } from "react";
import CoinPrice from "@/components/elements/CoinPrice";

interface CoinProps {
  coinSymbol: Coin;
  coinName: string;
  show: boolean;
}
const CoinStatus = ({ coinSymbol, coinName, show }: CoinProps) => {
  const { coin: cachedCoin } = UseCoin();

  const CachedTypeCoin: MarketType["data"][number] = cachedCoin;

  return (
    <div className=" px-7">
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
  );
};

export default CoinStatus;
