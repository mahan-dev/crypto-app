import { GiPlainCircle } from "react-icons/gi";

import styles from "@/components/modules/css/AltCoinSeason/route.module.css";
import { altcoinSeasonApi } from "@/services/coingecko";
import { useQuery } from "@tanstack/react-query";
import Loader from "../loader/Loader";

const AltCoinSeason = () => {
  const { data, isLoading, isError } = useQuery({
    queryKey: ["altcoinIndex"],
    queryFn: async () => await altcoinSeasonApi(),
  });

  return (
    <div className={styles.container}>
      {isLoading && <Loader />}
      {isError && <h2 className="m-auto">Failed ... 😞</h2>}

      {data && !isError && (
        <>
          <h3 className="self-start font-medium">Altcoin Season</h3>

          <div className={styles.container__display}>
            {data}
            <span>/100</span>
          </div>

          <div className={styles.container__labels}>
            <span>Bitcoin</span>
            <span>Altcoin</span>
          </div>

          <div className={styles.container__graph}>
            <div className={styles.graph__content}>
              <div className={styles.content__orange} />
              <div className={styles["content__fade-orange"]} />
              <div className={styles["content__fade-blue"]} />
              <div className={styles.content__blue} />
            </div>

            <GiPlainCircle
              className={styles.content__circle}
              style={{
                left: `calc(${data}% - 8px)`,
              }}
            />
          </div>
        </>
      )}
    </div>
  );
};

export default AltCoinSeason;
