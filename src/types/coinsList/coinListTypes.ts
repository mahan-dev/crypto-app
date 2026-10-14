import z from 'zod';

export const coin = z.enum(['prices', 'market_caps', 'total_volumes']);
type TypesCoin = z.infer<typeof coin>;
export const order = z.enum(['default', 'down', 'up']);
type SortOrder = z.infer<typeof order>;
export const field = z.enum(['price', '24h', 'market_cap', 'circulating_supply', 'default']);
type SortField = z.infer<typeof field>;

export type { TypesCoin, SortOrder, SortField };
