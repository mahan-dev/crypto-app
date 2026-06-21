interface MarketType {
  status: number;
  data: {
    id: string;
    symbol: string;
    name: string;
    image: string;
    market_cap: number;
    market_cap_rank: number;
    current_price: number;
    circulating_supply: number;
    market_cap_change_percentage_24h: number;
    fully_diluted_valuation: number;
    total_volume: number;
    total_supply: number;
    max_supply: number;
    ath: number;
    atl: number;
  }[];
}

export type { MarketType };
