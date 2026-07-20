import { getMarketList } from "@/services/coingecko";
import { useState } from "react";
import CoinsList, { type CoinsProps } from "@/components/modules/CoinsList";

import PaginationPage from "@/components/modules/Pagination";
import { useQuery } from "@tanstack/react-query";
import Loader from "@/components/loader/Loader";
import CurrencyDropDown from "@/components/modules/CurrencyDropDown";
import FearAndGreed from "@/components/modules/FearAndGreed";
import AltCoinSeason from "@/components/modules/AltCoinSeason";
import Cmc20Chart from "@/components/modules/Cmc20Chart";
import stylesBanner from "@/components/modules/css/coinsList/route.module.css";

const Home = () => {
  const [page, setPage] = useState(1);
  const [currency, setCurrency] = useState<CoinsProps["currency"]>("usd");

  const { data, isLoading, isError } = useQuery({
    queryKey: ["crypto", page, currency],
    queryFn: async () => await getMarketList(currency, page),
  });

  return (
    <section>
      <div className={stylesBanner.banner}>
        <FearAndGreed />

        <AltCoinSeason />

        <Cmc20Chart />
      </div>
      {isLoading && (
        <div className="w-full flex h-[80vh] justify-center items-center">
          <Loader />
        </div>
      )}
      {data && !!data.data.length && (
        <div className="mt-6">
          <CurrencyDropDown currency={currency} setCurrency={setCurrency} />

          <CoinsList data={data.data} currency={currency} />

          <PaginationPage page={page} setPage={setPage} />
        </div>
      )}
      {isError && (
        <h2 className="w-full flex justify-center mt-6">
          Something wen't wrong
        </h2>
      )}
    </section>
  );
};

export default Home;
