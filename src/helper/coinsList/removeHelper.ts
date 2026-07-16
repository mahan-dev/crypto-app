import type { MarketType } from "@/types/marketTypes";
import type { Dispatch, SetStateAction } from "react";
import type React from "react";

interface RemoveProps {
  e: React.MouseEvent<SVGElement | HTMLButtonElement>;
  coin: MarketType["data"][number];
  wishList: MarketType["data"];
  setWishList: Dispatch<SetStateAction<MarketType["data"]>>;
}

const removeHelper = ({e, coin, wishList, setWishList}:RemoveProps) => {
  const { id } = coin;
  e.stopPropagation();
  const updateWishList = wishList.filter((item) => item.id !== id);
  localStorage.setItem("wishList", JSON.stringify(updateWishList));
  setWishList(updateWishList);
};

export { removeHelper };
