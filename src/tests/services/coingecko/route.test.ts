import { describe, expect, it } from 'vitest';
import { getMarketList } from '@/services/coingecko';
import { marketSchema } from '@/types/marketTypes';

describe('testing api result', () => {
  it('should test getMarketList api', async () => {
    const result = await getMarketList('usd', 1);
    expect(() => marketSchema.parse(result)).not.toThrow();
  });
});
