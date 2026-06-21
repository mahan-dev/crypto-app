import type { MarketType } from "@/types/marketTypes";

import { useLocation, Navigate } from "react-router-dom";

import CoinPrice from "../elements/CoinPrice";
import { useEffect } from "react";
import UseCoin from "@/hooks/useCoin";
import { useQueryClient } from "@tanstack/react-query";
import CoinChart from "../modules/Chart";

type Coin = MarketType["data"][number]["symbol"];
const CoinDetail = () => {
  const location = useLocation();
  const coinName = location.pathname.split("/")[1];

  const { symbol, page, currency } = location.state;
  const coin = symbol as Coin;

  const queryClient = useQueryClient();
  const data: MarketType | undefined = queryClient.getQueryData([
    "crypto",
    page,
    currency,
  ]);

  const filterData = data?.data.find((item) => item.symbol === symbol);

  const { coin: cachedCoin, setCoin } = UseCoin();
  const CachedTypeCoin: MarketType["data"][number] = cachedCoin;

  useEffect(() => {
    if (!filterData) return;
    localStorage.setItem("crypto - detail", JSON.stringify(filterData));
    setCoin(filterData);
  }, [filterData]);

  if (coin === null) {
    return <Navigate to={"/"} replace />;
  }

  return (
    <section className="flex mt-2">
      <div className=" sticky top-0 max-w-82.5 w-full p-3">
        <p className="flex mb-4 items-center gap-1.5">
          <span className="flex items-center  gap-2 tex-[1.2rem] tracking-wide  font-medium line">
            <img src={CachedTypeCoin["image"]} width={25} height={25} alt="" />

            {coinName.charAt(0).toUpperCase() + coinName.slice(1)}
          </span>
          <span className=" text-[0.8rem] text-gray-400 uppercase">{coin}</span>
          <span className="text-[0.8rem] bg-gray-600 py-0.5 px-2 tracking-wide rounded-lg">
            {`#${CachedTypeCoin["market_cap_rank"] ?? "N/A"} `}
          </span>
        </p>

        <CoinPrice coin={coin} />

        <div className=" flex  flex-col gap-2 mt-5">
          <div className="flex flex-col items-center gap-1 py-1 border border-[#5b5b5b] rounded-md">
            <span className="text-[0.9rem] text-gray-400">Market cap</span>
            {CachedTypeCoin["market_cap"]}
          </div>

          <div className="flex flex-col items-center border border-[#5b5b5b] rounded-md p-1">
            <span>Volume (24h)</span>
            {CachedTypeCoin["total_volume"]}
          </div>

          <div className="flex flex-col items-center border border-[#5b5b5b] rounded-md p-1">
            <span>Vol/Mkt Cap (24h)</span>
            {CachedTypeCoin["market_cap_change_percentage_24h"].toFixed(2)}
          </div>

          <div className="flex flex-col py-1 text-center border border-[#5b5b5b] rounded-md">
            <span>FDV</span>
            {CachedTypeCoin["fully_diluted_valuation"]}
          </div>
          <div className="flex flex-1 flex-col text-center border border-[#5b5b5b] rounded-md py-1">
            <span>Total supply</span>
            {CachedTypeCoin["total_supply"]}
          </div>

          <div className="flex flex-1 flex-col text-center border border-[#5b5b5b] rounded-md py-1">
            <span>Max supply</span>

            {CachedTypeCoin["max_supply"]}
          </div>

          <div className="flex flex-col text-center border border-[#5b5b5b] rounded-md py-1">
            <span>Circulating supply</span>
            {CachedTypeCoin["circulating_supply"]}
          </div>

          <div className="flex flex-col text-center border border-[#5b5b5b] rounded-md py-1">
            <span>Treasury Holdings</span>
            {CachedTypeCoin["circulating_supply"]}
          </div>
        </div>

        <div className="fle mt-5 ">
          <p className="">Price Performance</p>

          <div className="flex justify-between">
            <span>
              Low:
              {CachedTypeCoin["atl"]}
            </span>
            <span>
              High:
              {CachedTypeCoin["ath"]}
            </span>
          </div>
        </div>
      </div>
      {/* <div className="w-full">
        <CoinChart />
      </div> */}
    </section>
  );
};

export default CoinDetail;
