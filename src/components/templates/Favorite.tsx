import { useWishList } from "@/hooks/useWishList";
import styles from "@/components/templates/styles/favorite/route.module.css";
import type { MouseEvent } from "react";
import type { MarketType } from "@/types/marketTypes";
import { removeHelper } from "@/helper/coinsList/removeHelper";

const Favorite = () => {
  const { wishList, setWishList } = useWishList();

  const removeHandler = (
    e: MouseEvent<HTMLButtonElement>,
    coin: MarketType["data"][number],
  ) => {
    removeHelper({ e, coin, wishList, setWishList });
  };

  return (
    <ul className="flex flex-wrap gap-4">
      {wishList.length
        ? wishList.map((item) => (
            <li key={item.id} className={styles.list}>
              <div className="flex flex-col gap-3">
                <div className={styles.list__header}>
                  <span className="text-[1rem] ">{item.market_cap_rank}</span>
                  <span className="text-[0.8rem]">{item.symbol}</span>
                </div>
                <div className={styles.list__main}>
                  <div className="w-8 h-8 ">
                    <img
                      className="rounded-full"
                      src={item.image}
                      alt="coin-imgs"
                    />
                  </div>
                  <span className=" text-[0.8rem] text-gray-300">
                    {item.name}
                  </span>
                </div>
              </div>
              <button
                className={styles.list__remove}
                onClick={(e: MouseEvent<HTMLButtonElement>) =>
                  removeHandler(e, item)
                }
              >
                -
              </button>
            </li>
          ))
        : ""}
    </ul>
  );
};

export default Favorite;
