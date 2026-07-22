import styles from "@/components/modules/css/coinStatus/route.module.css";
import { ValueChecker } from "@/helper/coinDetails/coinValueChecker";
import type { Coin } from "./Chart";

import type { MarketType } from "@/types/marketTypes";

import CoinPrice from "@/components/elements/CoinPrice";

interface CoinProps {
  coinSymbol: Coin;
  coinName: string;
  show: boolean;
  filteredData?: MarketType["data"][number];
}
const CoinStatus = ({
  coinSymbol,
  coinName,
  show,
  filteredData,
}: CoinProps) => {
  const data: MarketType["data"][number] =
    filteredData as MarketType["data"][number];

  return (
    <div className=" px-7">
      <div className={styles.left__header}>
        <div className={styles.header__coin}>
          <span className={styles.coin__image}>
            <img
              className="rounded-full"
              src={data["image"]}
              width={25}
              height={25}
              alt="coin_image"
            />

            {coinName.charAt(0).toUpperCase() + coinName.slice(1)}
          </span>
          <span className={styles.coin__symbol}>{coinSymbol}</span>
          <span className={styles["coin__market-cap"]}>
            {`#${ValueChecker(data["market_cap_rank"])} `}
          </span>
        </div>
      </div>
      {data["id"] === "tether" ? (
        <span>${data["current_price"]}</span>
      ) : (
        <CoinPrice coin={coinSymbol} boolean={show} />
      )}
    </div>
  );
};

export default CoinStatus;
