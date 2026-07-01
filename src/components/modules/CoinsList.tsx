import type { MarketType } from "@/types/marketTypes";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../../../@/components/ui/table";

import { TiArrowSortedUp } from "react-icons/ti";
import { TiArrowSortedDown } from "react-icons/ti";

import chartUp from "@/assets/chart-up.svg";
import chartDown from "@/assets/chart-down.svg";
import {
  coinPriceSorting,
  PriceCommaFormatter,
  priceFormatter,
  symbolFormatter,
} from "@/helper/coinsList/formattedData";

import { useNavigate } from "react-router-dom";

import FearAndGreed from "./FearAndGreed";
import AltCoinSeason from "./AltCoinSeason";

import styles from "@/components/modules/css/coinsList/route.module.css";

import Cmc20Chart from "./Cmc20Chart";
import { useMemo, useState, type Dispatch, type SetStateAction } from "react";
import { coinHandler } from "@/helper/coinsList/coinHandler";
import { formatPrice } from "@/helper/coinDetails/coinValueChecker";

interface CoinsProps {
  data: MarketType["data"];
  currency: string;
  setCurrency: Dispatch<SetStateAction<string>>;
  page: number;
}

export type TypesCoin = "prices" | "market_caps" | "total_volumes";
export type SortOrder = "default" | "down" | "up";
export type SortField = "price" | "24h" | "market_cap" | "circulating_supply" | "default";

const CoinsList = ({ data, currency, page }: CoinsProps) => {
  const [sortField, setSortField] = useState<SortField>("default");
  const [sortOrder, setSortOrder] = useState<SortOrder>("default");

  const sortedCoins = useMemo(() => {
    return coinPriceSorting(data, sortOrder, sortField);
  }, [data, sortOrder, sortField]);

  const statusHandler = (field: SortField) => {
    if (!data.length) return;

    setSortField(field);

    setSortOrder((prev) => {
      return prev === "default" ? "down" : prev === "down" ? "up" : "default";
    });
  };

  const coinToRender = sortedCoins.length ? sortedCoins : data;

  const navigate = useNavigate();

  const coinClickHandler = async (
    id: MarketType["data"][number]["id"],
    symbol: MarketType["data"][number]["symbol"],
  ) => {
    await coinHandler(data, id, navigate, symbol, currency, page);
  };

  const classNameHandler = (status: SortOrder, field: SortField) => {
    if (sortField !== field) return "opacity-25";
    return sortOrder === status ? "opacity-100" : "opacity-25";
  };

  return (
    <>
      <div className={styles.banner}>
        <FearAndGreed />

        <AltCoinSeason />

        <Cmc20Chart />
      </div>

      {data && data.length && (
        <Table className="text-white mt-12 ">
          <TableHeader>
            <TableRow className="*:text-white hover:bg-transparent">
              <TableHead className="w-2 text-center">#</TableHead>
              <TableHead className="w-35 flex items-center">Name</TableHead>
              <TableHead className="w-px text-right">
                <div className="flex items-center gap-2">
                  Price
                  <div onClick={() => statusHandler("price")}>
                    <TiArrowSortedUp
                      className={classNameHandler("up", "price")}
                    />
                    <TiArrowSortedDown
                      className={classNameHandler("down", "price")}
                    />
                  </div>
                </div>
              </TableHead>

              <TableHead className="w-7  text-right">
                <div className=" flex items-center gap-2">
                  24h %
                  <div onClick={() => statusHandler("24h")}>
                    <TiArrowSortedUp
                     className={classNameHandler("up", "24h")}
                    />
                    <TiArrowSortedDown
                      className={classNameHandler("down", "24h")}
                    />
                  </div>
                </div>
              </TableHead>

              <TableHead className="w-37 text-right">
                <div className="flex justify-end items-center gap-2">
                  Market Cap
                  <div onClick={() => statusHandler("market_cap")}>
                    <TiArrowSortedUp
                      className={classNameHandler("up", "market_cap")}
                    />
                    <TiArrowSortedDown
                      className={classNameHandler("down", "market_cap")}
                    />
                  </div>
                </div>
              </TableHead>

              <TableHead className="text-right">
                <div className="flex gap-2 items-center justify-end">Circulating Supply
                  <div onClick={() => statusHandler("circulating_supply")}>
                     <TiArrowSortedUp
                      className={classNameHandler("up", "circulating_supply")}
                    />
                    <TiArrowSortedDown
                      className={classNameHandler("down", "circulating_supply")}
                    />
                  </div>

                </div>
              </TableHead>
              <TableHead className="text-right">
                <div>Last 7 Days</div>
              </TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {coinToRender.map((coin) => {
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
                  onClick={() => coinClickHandler(id, symbol)}
                >
                  <TableCell className=" first-of-type:text-center">
                    {market_cap_rank}
                  </TableCell>
                  <TableCell className="align-middle">
                    <div className="flex gap-2 items-center ">
                      <img
                        className="rounded-full w-6.25 h-6.25"
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
                    {formatPrice(circulating_supply)}
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
