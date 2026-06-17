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
import type { Dispatch, SetStateAction } from "react";
import type { DataResponse } from "@/helper/coinsList/formattedData";
export const description = "A simple area chart";

const chartConfig = {
  desktop: {
    label: "Desktop",
    color: "var(--chart-1)",
  },
} satisfies ChartConfig;

interface CoinProps {
  chart: null | DataResponse[];
  setChart: Dispatch<SetStateAction<DataResponse[] | null>>;
}

const CoinChart = ({ chart, setChart }: CoinProps) => {
  console.log(chart);

  if (!chart) return;

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

      <Card className="bg-[#252525] text-white">
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
              data={chart}
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
        <CardFooter className="bg-inherit">
          <div className="flex w-full items-start gap-2 text-sm">
            <div className="grid gap-2">
              {/* <div className="flex items-center gap-2 leading-none font-medium">
                Trending up by 5.2% this month{" "}
                <TrendingUp className="h-4 w-4" />
              </div> */}
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
