import { cmc20TokenIndexApi } from "@/services/coingecko";
import { useQuery } from "@tanstack/react-query";

import Cmc20Chart from "./Cmc20Chart";

const Cmc20Token = () => {
  const { data, isLoading, isError } = useQuery({
    queryKey: ["cmc20Token"],
    queryFn: async () => await cmc20TokenIndexApi(),
  });

  return (
    <div>
      <Cmc20Chart data={data ?? null} />
    </div>
  );
};

export default Cmc20Token;
