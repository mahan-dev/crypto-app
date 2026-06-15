import { getMarketList } from "@/services/coingecko";
import { useEffect, useState } from "react";
import CoinsList from "@/components/modules/CoinsList";
import type { MarketType } from "@/types/marketTypes";

import PaginationPage from "@/components/modules/Pagination";

const Home = () => {
  const [data, setData] = useState<MarketType>();
  const [page, setPage] = useState(1);
  const [currency, setCurrency] = useState("usd");

  useEffect(() => {
    const dataFetcher = async () => {
      const res = await getMarketList(currency, page);
      setData(res);
    };
    dataFetcher();
  }, [page]);

  return (
    <>
      {data && data.data.length ? (
        <>
          <CoinsList data={data.data} />

          <PaginationPage page={page} setPage={setPage} />
        </>
      ) : (
        <h2 className="w-full flex justify-center mt-6">
          Something wen't wrong
        </h2>
      )}
    </>
  );
};

export default Home;
