import type { CoinSchema } from '@/types/marketTypes';
import type { useNavigate } from 'react-router-dom';

const coinHandler = async (
  data: CoinSchema[],
  id: CoinSchema['id'],
  navigate: ReturnType<typeof useNavigate>,
) => {
  const finalID = data?.find((item) => item.id === id);

  if (finalID) {
    navigate(`${id}`, {});
  }
};

export { coinHandler };
