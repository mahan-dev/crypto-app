import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuShortcut,
  DropdownMenuTrigger,
} from "../../../@/components/ui/dropdown-menu";
import { type Dispatch, type SetStateAction } from "react";
import type { CoinsProps } from "./CoinsList";

interface CurrencyProps {
  setCurrency: Dispatch<SetStateAction<CoinsProps["currency"]>>;
}
const CurrencyDropDown = ({ setCurrency }: CurrencyProps) => {
  const selectHandler = (field: CoinsProps["currency"]) => {
    setCurrency((prev) => {
      if (prev === field) return prev;
      return field;
    });
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button className="text-black" variant="outline">
          Currency
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        <DropdownMenuGroup className="**:cursor-pointer">
          <DropdownMenuLabel>My Account</DropdownMenuLabel>
          <DropdownMenuItem onSelect={() => selectHandler("usd")}>
            USD
            <DropdownMenuShortcut>💶 </DropdownMenuShortcut>
          </DropdownMenuItem>
          <DropdownMenuItem onSelect={() => selectHandler("eur")}>
            EUR
            <DropdownMenuShortcut>💶</DropdownMenuShortcut>
          </DropdownMenuItem>
          <DropdownMenuItem onSelect={() => selectHandler("gbp")}>
            GBP
            <DropdownMenuShortcut> 💷</DropdownMenuShortcut>
          </DropdownMenuItem>
        </DropdownMenuGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};
export default CurrencyDropDown;
