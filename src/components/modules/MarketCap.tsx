import { formatPrice } from "@/helper/coinDetails/coinValueChecker";

import { marketCapApi, marketCapChartApi } from "@/services/coingecko";
import { useQuery } from "@tanstack/react-query";

import Cmc20Chart from "./Cmc20Chart";
import { useEffect } from "react";

const MarketCap = () => {
  // const { data } = useQuery({
  //   queryKey: ["marketCap"],
  //   queryFn: async () => {
  //     const [marketCap, marketCapChart] = await Promise.all([
  //       marketCapApi(),
  //       marketCapChartApi(),
  //     ]);
  //     return {
  //       marketCap,
  //       marketCapChart,
  //     };
  //   },
  //   retry: false,
  // });
  // console.log(data);
  const dataFetcher = async () => {
    await marketCapApi()
    await marketCapChartApi();
  };
  useEffect(() => {
    dataFetcher();
  }, []);

  // const totalMarketCap = formatPrice(data);
  // console.log("🌺 ~ MarketCap.tsx:12 -> totalMarketCap: ", totalMarketCap);

  return (
    <div>
      <Cmc20Chart title={"Market Cap"} />
    </div>
  );
};

export default MarketCap;
