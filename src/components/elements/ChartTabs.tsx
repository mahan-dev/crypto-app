// import * as React from "react";

// import { Button } from "@/components/ui/button";
// import {
//   DropdownMenu,
//   DropdownMenuContent,
//   DropdownMenuGroup,
//   DropdownMenuLabel,
//   DropdownMenuRadioGroup,
//   DropdownMenuRadioItem,
//   DropdownMenuTrigger,
// } from "../../../@/components/ui/dropdown-menu";
// import type { Days } from "@/components/modules/Chart";

// interface TimeFrameProps {
//   setDays: React.Dispatch<React.SetStateAction<Days>>;
// }

// const TimeFrameDropDown = ({ setDays }: TimeFrameProps) => {
//   const [position, setPosition] = React.useState("bottom");

//   const changeHandler = (value: string) => {
//     const formattedValue = +value as Days;

//     setDays(formattedValue);
//     setPosition(value);
//   };

//   return (
//     <DropdownMenu>
//       <DropdownMenuTrigger asChild>
//         <Button className="text-black cursor-pointer" variant="outline">
//           Open
//         </Button>
//       </DropdownMenuTrigger>
//       <DropdownMenuContent className="w-32">
//         <DropdownMenuGroup className="">
//           <DropdownMenuLabel>Chart frame</DropdownMenuLabel>
//           <DropdownMenuRadioGroup
//             value={position}
//             className="*:cursor-pointer"
//             onValueChange={changeHandler}
//           >
//             <DropdownMenuRadioItem value="365">1Y</DropdownMenuRadioItem>
//             <DropdownMenuRadioItem value="7">7D</DropdownMenuRadioItem>
//             <DropdownMenuRadioItem value="1">24H</DropdownMenuRadioItem>
//             <DropdownMenuRadioItem value="30">1M</DropdownMenuRadioItem>
//             <DropdownMenuRadioItem value="90">3M</DropdownMenuRadioItem>
//           </DropdownMenuRadioGroup>
//         </DropdownMenuGroup>
//       </DropdownMenuContent>
//     </DropdownMenu>
//   );
// };

// export default TimeFrameDropDown;

import type { Dispatch, MouseEvent, SetStateAction } from "react";
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
