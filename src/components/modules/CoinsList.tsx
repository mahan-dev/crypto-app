import type { MarketType } from "@/types/marketTypes";
import {
  Table,
  TableBody,
  // TableCaption,
  TableCell,
  // TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from "../../../@/components/ui/table";

interface CoinsProps {
  data: MarketType["data"];
}
const CoinsList = ({ data }: CoinsProps) => {
  console.log(data);

  return (
    <>
      {data?.length && (
        <Table className="text-white mt-12 ">
          <TableHeader>
            <TableRow className="*:text-white">
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
                symbol,
                market_cap_rank,
                current_price,
                circulating_supply,
                market_cap,
                market_cap_change_percentage_24h: percentage_24,
              } = coin;
              return (
                <TableRow className="*:text-right" key={coin.name}>
                  <TableCell className=" font-medium first-of-type:text-center">
                    {market_cap_rank}
                  </TableCell>
                  <TableCell className="font-medium flex gap-2 items-center">
                    <img
                      className="rounded-full"
                      src={coin.image}
                      alt={symbol}
                      width={25}
                      height={25}
                    />
                    {symbol.split("_")[0]}
                  </TableCell>
                  <TableCell className="">
                    $
                    {current_price < 1
                      ? current_price.toFixed(4)
                      : current_price}
                  </TableCell>

                  <TableCell>{percentage_24 ? percentage_24 : "null"}</TableCell>
                  <TableCell>{market_cap.toLocaleString(undefined, {
                      maximumFractionDigits: 0,
                    })}</TableCell>
                  

                  <TableCell>
                    {(circulating_supply / 1000000).toLocaleString(undefined, {
                      minimumFractionDigits: 2,
                      maximumFractionDigits: 2,
                    })}
                    <span className="ml-2">
                      {symbol.split("_")[0].toLocaleUpperCase()}
                    </span>
                  </TableCell>
                  <TableCell>Graph</TableCell>
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
