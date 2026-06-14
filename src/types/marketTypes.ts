interface MarketType {
  status: number;
  data: {
    id: string;
    symbol: string;
    name: string;
    image: string;
    market_cap_rank: number;
    current_price: number;
  }[];
}

export type { MarketType };
