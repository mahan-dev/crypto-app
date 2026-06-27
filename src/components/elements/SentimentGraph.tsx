import { TrendingUp, TrendingDown } from "lucide-react";

import styles from "@/components/elements/styles/sentimentGraph/route.module.css";

interface WinLossBarProps {
  sentimentUp: number;
  sentimentDown: number;
}

const WinLossBar = ({ sentimentUp, sentimentDown }: WinLossBarProps) => {
  const statusUp = sentimentUp;
  const statusDown = sentimentDown;

  return (
    <div className={styles.sentiment}>
      <div className={styles.sentiment__trendingUp}>
        <TrendingUp className=" stroke-[2.5]" />
        <span>{statusUp || "null"}%</span>
      </div>

      <div className={styles.sentiment__graph}>
        <div
          style={{ width: `${statusUp || 20}%` }}
          className={styles.graph__green}
        />

        <div
          style={{ width: `${statusDown || 20}%` }}
          className={styles.graph__red}
        />
      </div>

      <div className={styles.graph__red__down}>
        <span>{statusDown || "null"}%</span>

        <TrendingDown className="stroke-[2.5]" />
      </div>
    </div>
  );
};

export default WinLossBar;
