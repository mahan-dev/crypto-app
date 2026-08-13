export const coinTitleHandler = (coin: string) => {
  return coin.charAt(0).toUpperCase() + coin.slice(1).split(" ")[0];
};
