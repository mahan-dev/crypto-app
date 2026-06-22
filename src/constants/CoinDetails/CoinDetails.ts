import { ValueChecker } from "@/helper/coinDetails/coinValueChecker";

import type { MarketType } from "@/types/marketTypes";

const coinItems = (CachedTypeCoin: MarketType["data"][number]) => [
  {
    label: "Market cap",
    value: ValueChecker(CachedTypeCoin["market_cap"]),
  },
  {
    label: "Volume (24h)",
    value: ValueChecker(CachedTypeCoin["total_volume"]),
  },
  {
    label: "Vol/Mkt Cap (24h)",
    value: ValueChecker(CachedTypeCoin["market_cap_change_percentage_24h"]),
  },
  {
    label: "FDV",
    value: ValueChecker(CachedTypeCoin["fully_diluted_valuation"]),
  },
  {
    label: "Total supply",
    value: ValueChecker(CachedTypeCoin["total_supply"]),
  },
  {
    label: "Max supply",
    value: ValueChecker(CachedTypeCoin["max_supply"]),
  },
  {
    label: "Circulating supply",
    value: ValueChecker(CachedTypeCoin["circulating_supply"]),
  },
  {
    label: "Treasury Holdings",
    value: ValueChecker(CachedTypeCoin["circulating_supply"]),
  },
];

export { coinItems };
