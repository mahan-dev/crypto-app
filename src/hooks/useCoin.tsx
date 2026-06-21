import { useState } from "react";

const UseCoin = () => {
  const [coin, setCoin] = useState(() => {
    const getCoin = JSON.stringify(localStorage.getItem("crypto - detail"));
    return getCoin ? JSON.parse(getCoin) : null;
  });

  return { coin, setCoin };
};

export default UseCoin;
