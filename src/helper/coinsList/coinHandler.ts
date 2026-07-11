import type { MarketType } from "@/types/marketTypes";
import type { useNavigate } from "react-router-dom";

const coinHandler = async (
  data: MarketType["data"],
  id: MarketType["data"][number]["id"],
  navigate: ReturnType<typeof useNavigate>,
) => {
  const finalD = data?.find((item) => item.id === id);

  if (finalD) {
    navigate(`${id}`, {});
  }
};

export { coinHandler };
