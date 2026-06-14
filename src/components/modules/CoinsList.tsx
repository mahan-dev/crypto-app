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
          {/* <TableCaption>A list of your recent invoices.</TableCaption> */}
          <TableHeader>
            <TableRow className="*:text-white">
              <TableHead className="w-2 text-center">#</TableHead>
              <TableHead className="w-35 flex items-center">Name</TableHead>
              <TableHead className="w-px text-right">Price</TableHead>

              <TableHead className="w-7  text-right">
                <div className="w-12">1h %</div>
              </TableHead>
              <TableHead className="w-7  text-right">
                <div className="w-12">24h %</div>
              </TableHead>
              <TableHead className="w-7  text-right">
                <div className="w-12">7d %</div>
              </TableHead>
              <TableHead className="w-37 text-right">
                <div>Market Cap</div>
              </TableHead>
              <TableHead className="w-37 text-right">
                <div>
                  {`
              Volume(24h)`}
                </div>
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
              const { symbol, market_cap_rank, current_price } = coin;
              return (
                <TableRow className="*:text-right">
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
                    {symbol.split("_")}
                  </TableCell>
                  <TableCell className="">
                    $
                    {current_price < 1
                      ? current_price.toFixed(4)
                      : current_price}
                  </TableCell>
                  <TableCell className="w-fit">0.00</TableCell>
                  <TableCell>0.00</TableCell>
                  <TableCell>0.00</TableCell>
                  <TableCell>0.00</TableCell>
                  <TableCell>0.00</TableCell>
                  <TableCell>0.00</TableCell>
                  <TableCell>$250.00</TableCell>
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
