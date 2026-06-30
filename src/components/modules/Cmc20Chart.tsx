import { Card, CardContent, CardHeader } from "../../../@/components/ui/card";

import {
  ChartContainer,
  type ChartConfig,
} from "../../../@/components/ui/chart";
import { Area, AreaChart } from "recharts";
import { convertedData } from "@/helper/coinsList/formattedData";

import { useMemo } from "react";
import { useQuery } from "@tanstack/react-query";
import { cmc20TokenIndexApi } from "@/services/coingecko";
import Loader from "../loader/Loader";

const chartConfig = {
  desktop: {
    label: "Desktop",
    color: "var(--chart-1)",
  },
} satisfies ChartConfig;

interface CmcProps {
  title?: string;
}

const Cmc20Chart = ({ title }: CmcProps) => {
  const { data, isLoading, isError } = useQuery({
    queryKey: ["cmc20Token"],
    queryFn: async () => await cmc20TokenIndexApi(),
  });
  const splittedData = data?.prices.at(-1)?.[1].toFixed(2) ?? null;

  const finalData = useMemo(() => {
    if (!data) return;
    const result = convertedData(data, "prices");
    return result;
  }, [data]);

  return (
    <Card className={"bg-[#1E1F24] text-white h-full border border-[#3b3b3b]"}>
      {isLoading && (
        <div className="m-auto">
          <Loader />
        </div>
      )}
      {isError && <h2 className="m-auto">Failed ... 😞</h2>}
      {data && (
        <>
          <CardHeader>
            <span>{title ? title : "CMC20"}</span>
            {`$${splittedData}`}
          </CardHeader>
          <CardContent className="h-1">
            <ChartContainer className=" w-full h-16 " config={chartConfig}>
              <AreaChart
                accessibilityLayer
                
                data={finalData ?? []}
                margin={{
                  left: 12,
                  right: 12,
                }}
              >
                <Area
                  dataKey="prices"
                  activeDot={false}
                  type="natural"
                  fillOpacity={0}
                  strokeWidth={2}
                  stroke="var(--color-desktop)"
                />
              </AreaChart>
            </ChartContainer>
          </CardContent>
        </>
      )}
    </Card>
  );
};

export default Cmc20Chart;
