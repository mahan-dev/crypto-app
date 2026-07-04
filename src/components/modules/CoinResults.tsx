import type { SearchCoinProps } from "@/services/coingecko";
import { useState, type Dispatch, type SetStateAction } from "react";
import { Link } from "react-router-dom";

import styles from "@/components/modules/css/coinResult/route.module.css";

interface CoinResults {
  data: SearchCoinProps;
  setIsOpen: Dispatch<SetStateAction<boolean>>;
  setSearch: Dispatch<SetStateAction<string>>;
}
const CoinResults = ({ data, setIsOpen, setSearch }: CoinResults) => {
  const [showMore, setShowMore] = useState(false);

  const finalData = showMore ? data.coins : data.coins.slice(0, 3);

  return (
    <ul className="mt-2 overflow-y-auto">
      <>
        {finalData.map((item) => {
          return (
            <Link
              to={`/${item.id}`}
              key={item.id}
              onClick={() => {
                setIsOpen(false);
                setSearch("");
              }}
            >
              <li key={item.id} className={styles.result__list}>
                <img
                  className="rounded-full"
                  src={item.large}
                  alt="coin_img"
                  width={25}
                  height={25}
                />
                <div className="text-[0.7rem]">
                  <p>{item.name}</p>
                  <span className="text-gray-300">{item.symbol}</span>
                </div>
                <span></span>
              </li>
            </Link>
          );
        })}
        {!showMore && !!data.coins.length && (
          <div className={styles.result__button} onClick={() => setShowMore(true)}>ShowMore</div>
        )}
        {showMore && !!data.coins.length && (
          <div className={styles.result__button} onClick={() => setShowMore(false)}>Show less</div>
        )}
      </>
    </ul>
  );
};

export default CoinResults;
