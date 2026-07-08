import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuShortcut,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { type Dispatch, type SetStateAction } from "react";
import type { CoinsProps } from "./CoinsList";

interface CurrencyProps {
  currency: CoinsProps["currency"];
  setCurrency: Dispatch<SetStateAction<CoinsProps["currency"]>>;
}
const CurrencyDropDown = ({ currency, setCurrency }: CurrencyProps) => {
  const selectHandler = (field: CoinsProps["currency"]) => {
    setCurrency((prev) => {
      if (prev === field) return prev;
      return field;
    });
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger className="cursor-pointer" asChild>
        <Button className="text-black" variant="outline">
          {currency.toLocaleUpperCase()}
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        <DropdownMenuGroup className="**:cursor-pointer">
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
