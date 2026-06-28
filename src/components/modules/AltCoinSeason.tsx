import { GiPlainCircle } from "react-icons/gi";

import styles from "@/components/modules/css/AltCoinSeason/route.module.css";

interface AltCoinSeason {
  value: number;
}

const AltCoinSeason = ({ value }: AltCoinSeason) => {
  return (
    <div className={styles.container}>
      <h3 className="font-medium">Altcoin Season</h3>

      <div className={styles.container__display}>
        {value}
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
            left: `calc(${48}% - 8px)`,
          }}
        />
      </div>
    </div>
  );
};

export default AltCoinSeason;
