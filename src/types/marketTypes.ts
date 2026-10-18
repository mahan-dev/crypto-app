import { z } from 'zod';

export const coinSchema = z.object({
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
  max_supply: z.number().nullable(),
  ath: z.number(),
  atl: z.number(),
  status: z.number().optional(),
});

export const marketErrorSchema = z.object({
  status: z
    .object({
      error_code: z.number(),
      message: z.string(),
    })
    .optional(),
});

export const marketSchema = z.object({
  status: z.union([z.string(), z.number()]),
  message: z.string().optional(),
  data: z.union([z.array(coinSchema), marketErrorSchema]),
});

export type MarketType = z.infer<typeof marketSchema>;
export type CoinSchema = z.infer<typeof coinSchema>;
export type MarketError = z.infer<typeof marketErrorSchema>;
