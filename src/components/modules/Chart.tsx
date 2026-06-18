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

import { CgCloseR } from "react-icons/cg";
import {
  useEffect,
  useMemo,
  useRef,
  type Dispatch,
  type SetStateAction,
} from "react";
import {
  convertedData,
  type DataProps,
} from "@/helper/coinsList/formattedData";
import type { TypesCoin } from "./CoinsList";
import { Button } from "../ui/button";
import styles from "@/components/modules/css/Chart.module.css";
import type { MarketType } from "@/types/marketTypes";

export const description = "A simple area chart";

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

const CoinChart = ({ chart, setChart, type, setType, coin }: CoinProps) => {
  const cardRef = useRef<HTMLDivElement>(null);

  const click = (e: globalThis.MouseEvent) => {
    const currentItem = cardRef.current;
    if (currentItem && !currentItem.contains(e.target as Node)) {
      setChart(null);
    }
  };


  const finalData = useMemo(() => {
    if (!chart) return null;
    return convertedData(chart, type);
  }, [chart, type]);

  const buttonHandler = (value: TypesCoin) => {
    setType(value);
  };

  useEffect(() => {
    document.addEventListener("mousedown", click);
    return () => document.removeEventListener("mousedown", click);
  }, []);

  return (
    <section className={styles.container}>
      <div
        className="mb-3"
        onClick={() => {
          setChart(null);
          document.body.style.overflow = "auto";
        }}
      >
        <CgCloseR className="text-[1.3rem]" />
      </div>

      <Card ref={cardRef} className="bg-[#252525] text-white">
        <CardHeader>
          <CardTitle className="w-full tracking-wider">
            Chart - 7D <span className="ml-auto">{coin}</span>{" "}
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
