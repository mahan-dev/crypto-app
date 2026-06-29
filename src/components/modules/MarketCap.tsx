import { formatPrice } from "@/helper/coinDetails/coinValueChecker";

import { marketCapApi } from "@/services/coingecko";
import { useQuery } from "@tanstack/react-query";
import React from "react";

const MarketCap = () => {
  const { data } = useQuery({
    queryKey: ["marketCap"],
    queryFn: async () => await marketCapApi(),
  });

  const totalMarketCap = formatPrice(data);
  console.log("🌺 ~ MarketCap.tsx:12 -> totalMarketCap: ", totalMarketCap);

  return <div></div>;
};

export default MarketCap;
