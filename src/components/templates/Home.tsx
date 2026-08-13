import { getMarketList } from "@/services/coingecko";
import { lazy, Suspense, useState } from "react";
import type { CoinsProps } from "@/components/modules/CoinsList";

import { useQuery } from "@tanstack/react-query";
import stylesBanner from "@/components/modules/css/coinsList/route.module.css";
import Loader from "@/components/loader/Loader";

const CurrencyDropDown = lazy(
  () => import("@/components/modules/CurrencyDropDown"),
);
const CoinsList = lazy(() => import("@/components/modules/CoinsList"));
const PaginationPage = lazy(() => import("@/components/modules/Pagination"));

const FearAndGreed = lazy(() => import("@/components/modules/FearAndGreed"));
const AltCoinSeason = lazy(() => import("@/components/modules/AltCoinSeason"));
const Cmc20Chart = lazy(() => import("@/components/modules/Cmc20Chart"));

import HeaderSkeleton from "@/components/ui/reactSkeleton/skeleton";
import "react-loading-skeleton/dist/skeleton.css";

const Home = () => {
  const [page, setPage] = useState(1);
  const [currency, setCurrency] = useState<CoinsProps["currency"]>("usd");

  const { data, isLoading, isError } = useQuery({
    queryKey: ["crypto", page, currency],
    queryFn: () => getMarketList(currency, page),
  });

  return (
    <section>
      <div className={stylesBanner.coin__status}>
        <Suspense fallback={<HeaderSkeleton />}>
          <FearAndGreed />
          <AltCoinSeason />

          <Cmc20Chart />
        </Suspense>
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
