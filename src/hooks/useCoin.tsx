import { useState } from "react";

interface SetCoin {
  coinItem?: string;
}
const UseCoin = () => {
  const [coin] = useState(() => {
    const getCoin = localStorage.getItem("crypto - detail");
    // if (coinItem) localStorage.setItem("crypto - detail", coinItem);
    return getCoin ? JSON.parse(getCoin) : null;
  });

  return { coin };
};

export default UseCoin;
