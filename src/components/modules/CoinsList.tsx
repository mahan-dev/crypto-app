import type { MarketType } from "@/types/marketTypes";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../../../@/components/ui/table";

import chartUp from "@/assets/chart-up.svg";
import chartDown from "@/assets/chart-down.svg";
import {
  PriceCommaFormatter,
  priceFormatter,
  symbolFormatter,
} from "@/helper/coinsList/formattedData";

import { useNavigate } from "react-router-dom";
import ReactGauge from "./ReactGauge";

interface CoinsProps {
  data: MarketType["data"];
  currency: string;
  page: number;
}
export type TypesCoin = "prices" | "market_caps" | "total_volumes";
const CoinsList = ({ data, currency, page }: CoinsProps) => {
  const navigate = useNavigate();

  const coinHandler = async (
    id: MarketType["data"][number]["id"],
    symbol: MarketType["data"][number]["symbol"],
  ) => {
    const finalD = data.find((item) => item.id === id);

    if (finalD) {
      localStorage.setItem("crypto - detail", JSON.stringify(finalD));

      navigate(`${id}`, {
        state: { symbol, currency, page },
      });
    }
  };

  return (
    <>
      <div className="grid mt-6 ">
        <ReactGauge />
      </div>
      {data && data.length && (
        <Table className="text-white mt-12 ">
          <TableHeader>
            <TableRow className="*:text-white hover:bg-transparent">
              <TableHead className="w-2 text-center">#</TableHead>
              <TableHead className="w-35 flex items-center">Name</TableHead>
              <TableHead className="w-px text-right">Price</TableHead>

              <TableHead className="w-7  text-right">
                <div className="w-12">24h %</div>
              </TableHead>

              <TableHead className="w-37 text-right">
                <div>Market Cap</div>
              </TableHead>

              <TableHead className="text-right">
                <div>Circulating Supply</div>
              </TableHead>
              <TableHead className="text-right">
                <div>Last 7 Days</div>
              </TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {data.map((coin) => {
              const {
                id,
                name,
                symbol,
                market_cap_rank,
                current_price,
                circulating_supply,
                market_cap,
                market_cap_change_percentage_24h: percentage_24,
              } = coin;
              return (
                <TableRow
                  className="*:text-right cursor-pointer"
                  key={name}
                  onClick={() => coinHandler(id, symbol)}
                >
                  <TableCell className=" first-of-type:text-center">
                    {market_cap_rank}
                  </TableCell>
                  <TableCell className="align-middle">
                    <div className="flex gap-2 items-center ">
                      <img
                        className="rounded-full"
                        src={coin.image}
                        alt={symbol}
                        width={25}
                        height={25}
                      />
                      {symbolFormatter(symbol)}
                    </div>
                  </TableCell>
                  <TableCell>
                    $
                    {current_price < 1
                      ? current_price.toFixed(4)
                      : PriceCommaFormatter(current_price)}
                  </TableCell>

                  <TableCell
                    className={`${percentage_24 === null ? "" : percentage_24 > 0 ? "text-green-500" : "text-red-500"}`}
                  >
                    {percentage_24 ? percentage_24.toFixed(2) : "null"}
                  </TableCell>
                  <TableCell>{PriceCommaFormatter(market_cap)}</TableCell>

                  <TableCell>
                    {priceFormatter(circulating_supply)}
                    <span className="ml-2">{symbolFormatter(symbol)}</span>
                  </TableCell>
                  <TableCell>
                    <img
                      className="ml-auto"
                      src={percentage_24 > 0 ? chartUp : chartDown}
                      alt={"chart svg"}
                      width={100}
                    />
                  </TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      )}
    </>
  );
};

export default CoinsList;
