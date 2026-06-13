interface MarketType {
  status: number;
  data: { id: string; symbol: string; name: string; image: string }[];
}

export type { MarketType };
