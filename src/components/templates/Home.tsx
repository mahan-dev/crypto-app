import { getMarketList } from "@/services/coingecko";
import { useState } from "react";
import CoinsList from "@/components/modules/CoinsList";

import PaginationPage from "@/components/modules/Pagination";
import { useQuery } from "@tanstack/react-query";

const Home = () => {
  const [page, setPage] = useState(1);
  const [currency, setCurrency] = useState("usd");

  const { data } = useQuery({
    queryKey: ["crypto", page, currency],
    queryFn: async () => await getMarketList(currency, page),
  });

  console.log(data);

  const filter = data?.data.find((item) => item.id === "bitcoin");
  console.log(filter);

  return (
    <>
      {data && data.data.length ? (
        <>
          <CoinsList data={data.data} page={page} currency={currency} />

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
