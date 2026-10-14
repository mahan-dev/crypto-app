import { z } from 'zod';

export const marketSchema = z.object({
  status: z.union([z.number(), z.string()]),

  data: z.array(
    z.object({
      id: z.string(),
      symbol: z.string(),
      name: z.string(),
      image: z.string(),
      market_cap: z.number(),
      market_cap_rank: z.number(),
      current_price: z.number(),
      circulating_supply: z.number(),
      market_cap_change_percentage_24h: z.number(),
      fully_diluted_valuation: z.number(),
      total_volume: z.number(),
      total_supply: z.number(),
      max_supply: z.number(),
      ath: z.number(),
      atl: z.number(),
    }),
  ),
});

export type MarketType = z.infer<typeof marketSchema>;
