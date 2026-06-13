import type { MarketType } from "@/types/marketTypes";

interface CoinsProps {
  data: MarketType;
}
const CoinsList = ({ data }: CoinsProps) => {
  console.log(data);

  return <div></div>;
};

export default CoinsList;
