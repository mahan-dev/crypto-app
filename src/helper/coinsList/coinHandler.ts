import type { MarketType } from "@/types/marketTypes";
import type { useNavigate } from "react-router-dom";

const coinHandler = async (
  data: MarketType["data"],
  id: MarketType["data"][number]["id"],
  navigate: ReturnType<typeof useNavigate>,
  symbol: MarketType["data"][number]["symbol"],
  currency: string,
  page: number,
) => {
  const finalD = data?.find((item) => item.id === id);

  if (finalD) {
    localStorage.setItem("crypto - detail", JSON.stringify(finalD));

    navigate(`${id}`, {
      state: { symbol, currency, page },
    });
  }
};

export { coinHandler };
