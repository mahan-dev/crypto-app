import type { SearchCoinProps } from "@/services/coingecko";
import { useState } from "react";
import { Link } from "react-router-dom";

interface CoinResults {
  data: SearchCoinProps;
}
const CoinResults = ({ data }: CoinResults) => {
  const [showMore, setShowMore] = useState(false);

  const finalData = showMore ? data.coins : data.coins.slice(0, 3);
  return (
    <ul className="mt-2 overflow-y-auto">
      <>
        {finalData.map((item) => {
          return (
            <Link to={`/${item.api_symbol}`} key={item.id}>
              <li
                key={item.id}
                className="flex gap-1.5 py-2.5 items-center"
                
              >
                <img src={item.large} alt="coin_img" width={25} height={25} />
                <p className="text-[0.9rem]">{item.name}</p>
              </li>
            </Link>
          );
        })}
        {!showMore && !!data.coins.length && (
          <div onClick={() => setShowMore(true)}>ShowMore</div>
        )}
        {showMore && !!data.coins.length && (
          <div onClick={() => setShowMore(false)}>Show less</div>
        )}
      </>

   
    </ul>
  );
};

export default CoinResults;
