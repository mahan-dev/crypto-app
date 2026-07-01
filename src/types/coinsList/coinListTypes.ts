type TypesCoin = "prices" | "market_caps" | "total_volumes";
type SortOrder = "default" | "down" | "up";
type SortField =
  | "price"
  | "24h"
  | "market_cap"
  | "circulating_supply"
  | "default";

export type { TypesCoin, SortOrder, SortField };
