import type { CoinsProps } from "@/components/modules/CoinsList";
import { PriceCommaFormatter } from "./formattedData";

const currencyList = {
  usd: "$",
  eur: "€",
  pound: "£",
};

const currencyHandler = (
  current_price: number,
  currency: CoinsProps["currency"],
) => {
  const finalCurrency = currencyList[currency];

  return `${finalCurrency}${
    current_price < 1
      ? current_price.toFixed(4)
      : PriceCommaFormatter(current_price)
  }`;
};

export { currencyHandler };
