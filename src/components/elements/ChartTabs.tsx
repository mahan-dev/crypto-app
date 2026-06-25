import type { Dispatch, SetStateAction } from "react";
import { Tabs, TabsList, TabsTrigger } from "../../../@/components/ui/tabs";
import type { Days } from "../modules/Chart";
import { toast } from "sonner";

interface ChartProps {
  setDays: Dispatch<SetStateAction<Days>>;
}
const ChartTabs = ({ setDays }: ChartProps) => {
  const valueHandler = (value: string) => {
    if (!Number(value)) {
      toast.error("your not allowed", { position: "top-center" });
      return;
    }

    const formatted = +value as Days;

    setDays(formatted);
  };
  return (
    <Tabs defaultValue="7" onValueChange={valueHandler}>
      <TabsList className="*:cursor-pointer">
        <TabsTrigger value="365">1Y</TabsTrigger>
        <TabsTrigger value="7">1W</TabsTrigger>
        <TabsTrigger value="1">24H</TabsTrigger>
        <TabsTrigger value="30">1M</TabsTrigger>
        <TabsTrigger value="90">3M</TabsTrigger>
      </TabsList>
    </Tabs>
  );
};

export default ChartTabs;
