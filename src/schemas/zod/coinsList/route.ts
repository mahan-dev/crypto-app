import z from 'zod';

export const CoinsProps = z.enum(['usd', 'eur', 'gbp']);
export type CurrencyType = z.infer<typeof CoinsProps>;
