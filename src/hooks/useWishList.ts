import type { MarketType } from "@/types/marketTypes";
import { useState } from "react";

export const useWishList = () => {
  const [wishList, setWishList] = useState<MarketType["data"]>(() => {
    const coins = localStorage.getItem("wishList");
    return coins ? JSON.parse(coins) : [];
  });

  return {
    wishList,
    setWishList,
  };
};

const wishListHelper = (
  prev: MarketType["data"],
  item: MarketType["data"][number],
) => {
  const exists = prev.some((coin) => coin.id === item.id);
  if (exists)
    return prev.map((coin) =>
      coin.id === item.id ? { ...coin, star: true } : coin,
    );

  return [...prev, { ...item, star: false }];
};

export { wishListHelper };
