import type { CoinSchema } from '@/types/marketTypes';
import { useState } from 'react';

export const useWishList = () => {
  const [wishList, setWishList] = useState<CoinSchema[]>(() => {
    const coins = localStorage.getItem('wishList');
    return coins ? JSON.parse(coins) : [];
  });

  return {
    wishList,
    setWishList,
  };
};

const wishListHelper = (prev: CoinSchema[], item: CoinSchema) => {
  const exists = prev.some((coin) => coin.id === item.id);
  if (exists) return prev.map((coin) => (coin.id === item.id ? { ...coin, star: true } : coin));

  return [...prev, { ...item, star: false }];
};

export { wishListHelper };
