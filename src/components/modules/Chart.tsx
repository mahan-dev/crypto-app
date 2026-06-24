import { Area, AreaChart, XAxis } from "recharts";

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "../../../@/components/ui/card";
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
  type ChartConfig,
} from "../../../@/components/ui/chart";

import { useEffect, useMemo, useState, type Dispatch, type SetStateAction } from "react";
import {
  convertedData,
  type DataProps,
} from "@/helper/coinsList/formattedData";
import type { TypesCoin } from "./CoinsList";
import { Button } from "../ui/button";
import styles from "@/components/modules/css/Chart.module.css";
import type { MarketType } from "@/types/marketTypes";
import { useLocation } from "react-router-dom";
import UseCoin from "@/hooks/useCoin";
import { coinChart } from "@/services/coingecko";
import { ValueChecker } from "@/helper/coinDetails/coinValueChecker";
import CoinPrice from "../elements/CoinPrice";

import styles2 from "@/components/modules/css/route.module.css";

const chartConfig = {
  desktop: {
    label: "Desktop",
    color: "var(--chart-1)",
  },
} satisfies ChartConfig;

interface CoinProps {
  chart: DataProps["data"] | null;
  setChart: Dispatch<SetStateAction<DataProps["data"] | null>>;
  type: TypesCoin;
  setType: Dispatch<SetStateAction<TypesCoin>>;
  coin: MarketType["data"][number]["name"];
}

const chartLabel = [
  { label: "Prices", value: "prices" },
  { label: "Market Cap", value: "market_caps" },
  { label: "Volume", value: "total_volumes" },
] as const;

type Coin = MarketType["data"][number]["symbol"];

const CoinChart = ({ chart, type, setType, coin, setChart }: CoinProps) => {

  const [show] = useState(() => document.body.offsetWidth <= 1111)

  const finalData = useMemo(() => {
    if (!chart) return null;
    return convertedData(chart, type);
  }, [chart, type]);
  

  const buttonHandler = (value: TypesCoin) => {
    setType(value);
  };

  const location = useLocation();
  const coinName = location.pathname.split("/")[1];
  const { coin: cachedCoin, setCoin: setCachedCoin } = UseCoin();
  const CachedTypeCoin: MarketType["data"][number] = cachedCoin;

  const { symbol} = location.state;
  const coinSymbol = symbol as Coin;

  const chartFetcher = async () => {
    await coinChart(CachedTypeCoin["id"]).then((res) => setChart(res));
  };

  useEffect(() => {
    if (document.body.offsetWidth <= 1110) {
      console.log("hi");
    }

    chartFetcher();
  }, []);

  return (
    <section className={styles.container}>
      <Card className="bg-[#252525] text-white">
        <div className="max-[1110px]:visible min-[1111px]:hidden px-7">
          <div className={styles2.left__header}>
            <div className={styles2.header__coin}>
              <span className={styles2.coin__image}>
                <img
                  className="rounded-full"
                  src={CachedTypeCoin["image"]}
                  width={25}
                  height={25}
                  alt="coin_image"
                />

                {coinName.charAt(0).toUpperCase() + coinName.slice(1)}
              </span>
              <span className={styles2.coin__symbol}>{coinSymbol}</span>
              <span className={styles2["coin__market-cap"]}>
                {`#${ValueChecker(CachedTypeCoin["market_cap_rank"])} `}
              </span>
            </div>
          </div>
          <CoinPrice coin={coinSymbol} boolean={show} />
        </div>
        <CardHeader className="px-7">
          <CardTitle className="w-full tracking-wider">
            Chart - <span className="ml-auto">{coin}</span>{" "}
          </CardTitle>
          <CardDescription>
            Showing total visitors for the last 6 months
          </CardDescription>
        </CardHeader>
        <CardContent>
          <ChartContainer className="h-100 w-full" config={chartConfig}>
            <AreaChart
              accessibilityLayer
              data={finalData ?? []}
              margin={{
                left: 12,
                right: 12,
              }}
            >
              <XAxis
                dataKey="date"
                tickLine={false}
                minTickGap={30}
                axisLine={false}
                tickMargin={8}
                tickFormatter={(value) => value.slice(0, 4)}
              />
              <ChartTooltip
                cursor={false}
                content={
                  <ChartTooltipContent
                    className="text-black"
                    indicator="line"
                  />
                }
              />
              <Area
                dataKey="prices"
                type="natural"
                fill="var(--color-desktop)"
                fillOpacity={0.4}
                stroke="var(--color-desktop)"
              />
            </AreaChart>
          </ChartContainer>
        </CardContent>
        <div className="flex justify-center gap-4">
          {chartLabel.map((item) => (
            <Button
              className="cursor-pointer"
              key={item.label}
              onClick={() => buttonHandler(item.value)}
              id={item.value}
              disabled={item.value === type}
            >
              {item.label}
            </Button>
          ))}
        </div>
        <CardFooter className="bg-inherit">Coinzed</CardFooter>
      </Card>
    </section>
  );
};
export default CoinChart;
