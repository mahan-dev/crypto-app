import * as React from "react";

import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuLabel,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuTrigger,
} from "../../../@/components/ui/dropdown-menu";
import type { Days } from "@/components/modules/Chart";

interface TimeFrameProps {
  setDays: React.Dispatch<React.SetStateAction<Days>>;
}

const TimeFrameDropDown = ({ setDays }: TimeFrameProps) => {



  const changeHandler = (value: string) => {
    const formattedValue = +value as Days;

    setDays(formattedValue);
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline">Open</Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-32">
        <DropdownMenuGroup className="text-black">
          <DropdownMenuLabel>Panel Position</DropdownMenuLabel>
          <DropdownMenuRadioGroup
            onValueChange={changeHandler}
          >
            <DropdownMenuRadioItem value="365">1Y</DropdownMenuRadioItem>
            <DropdownMenuRadioItem value="7">7D</DropdownMenuRadioItem>
            <DropdownMenuRadioItem value="1">24H</DropdownMenuRadioItem>
            <DropdownMenuRadioItem value="30">1M</DropdownMenuRadioItem>
            <DropdownMenuRadioItem value="90">3M</DropdownMenuRadioItem>
          </DropdownMenuRadioGroup>
        </DropdownMenuGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default TimeFrameDropDown;
