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
  useRef,
  type Dispatch,
  type MouseEvent,
  type SetStateAction,
} from "react";
import {
  convertedData,
  type DataProps,
  type DataResponse,
} from "@/helper/coinsList/formattedData";
import type { TypesCoin } from "./CoinsList";
import { Button } from "../ui/button";
export const description = "A simple area chart";

const chartConfig = {
  desktop: {
    label: "Desktop",
    color: "var(--chart-1)",
  },
} satisfies ChartConfig;

interface CoinProps {
  chart: DataProps["data"];
  setChart: Dispatch<SetStateAction<DataResponse[] | DataProps["data"] | null>>;
  type: TypesCoin;
  setType: Dispatch<SetStateAction<TypesCoin>>;
}

const chartLabel = [
  { label: "Prices", value: "prices" },
  { label: "Market Cap", value: "market_caps" },
  { label: "Volume", value: "total_volumes" },
] as const;

const CoinChart = ({ chart, setChart, type, setType }: CoinProps) => {
  const cardRef = useRef<HTMLDivElement>(null);

  const click = (e: globalThis.MouseEvent) => {
    const currentItem = cardRef.current;
    if (currentItem && !currentItem.contains(e.target as Node)) {
      setChart(null);
    }
  };

  const finalData = convertedData(chart, type);

  useEffect(() => {
    document.addEventListener("mousedown", click);
    return () => document.removeEventListener("mousedown", click);
  }, []);

  const buttonHandler = (value: TypesCoin) => {
    setType(value);
  };

  return (
    <section className="fixed inset-0 flex flex-col  justify-center p-23 backdrop-blur-sm max-md:p-8">
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
          <CardTitle className="tracking-wider">Chart - 7D</CardTitle>
          <CardDescription>
            Showing total visitors for the last 6 months
          </CardDescription>
        </CardHeader>
        <CardContent>
          <ChartContainer config={chartConfig}>
            <AreaChart
              accessibilityLayer
              data={finalData}
              margin={{
                left: 12,
                right: 12,
              }}
            >
              <XAxis
                dataKey="date"
                tickLine={false}
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
        <CardFooter className="bg-inherit">
          <div className="flex w-full items-start gap-2 text-sm">
            <div className="grid gap-2">
              <div className=" flex items-center gap-2 leading-none ">
                Coinzed
              </div>
            </div>
          </div>
        </CardFooter>
      </Card>
    </section>
  );
};
export default CoinChart;
