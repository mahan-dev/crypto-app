import { Area, AreaChart, XAxis } from "recharts";

import { Card, CardContent, CardFooter } from "../../../@/components/ui/card";
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
  type ChartConfig,
} from "../../../@/components/ui/chart";

import {
  useEffect,
  useMemo,
  useState,
  type Dispatch,
  type SetStateAction,
} from "react";
import {
  convertedData,
  type DataProps,
} from "@/helper/coinsList/formattedData";
import type { TypesCoin } from "./CoinsList";
import { Button } from "../ui/button";
import styles from "@/components/modules/css/chart/route.module.css";
import type { MarketType } from "@/types/marketTypes";
import { useLocation } from "react-router-dom";
import UseCoin from "@/hooks/useCoin";
import { coinChart } from "@/services/coingecko";

import CoinStatus from "./CoinStatus";
import ChartTabs from "../elements/ChartTabs";
import { chartLabel } from "@/constants/chart/chart";

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



export type Coin = MarketType["data"][number]["symbol"];
export type Days = 1 | 7 | 30 | 90 | 365;

const CoinChart = ({ chart, type, setType, setChart }: CoinProps) => {
  const [show] = useState(() => document.body.offsetWidth <= 1111);
  const [days, setDays] = useState<Days>(7);

  const finalData = useMemo(() => {
    if (!chart) return null;
    const items = convertedData(chart, type);
    console.log(items);
    return items;
  }, [chart, type]);

  const buttonHandler = (value: TypesCoin) => {
    setType(value);
  };

  const location = useLocation();
  const coinName = location.pathname.split("/")[1];
  const { coin: cachedCoin } = UseCoin();
  const CachedTypeCoin: MarketType["data"][number] = cachedCoin;

  const { symbol } = location.state;
  const coinSymbol = symbol as Coin;

  const chartFetcher = async () => {
    await coinChart(CachedTypeCoin["id"], days).then((res) => setChart(res));
  };

  useEffect(() => {
    chartFetcher();
  }, [days]);

  return (
    <>
      <Card className={styles.card}>
        <div className="flex justify-between pr-7 max-sm:mb-4 max-sm:flex-wrap max-sm:gap-2">
          <div className="max-[1110px]:visible min-[1111px]:hidden">
            <CoinStatus
              coinSymbol={coinSymbol}
              coinName={coinName}
              show={show}
            />
          </div>

          <div className="ml-auto">
            <ChartTabs setDays={setDays} />
          </div>
        </div>

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
    </>
  );
};
export default CoinChart;
