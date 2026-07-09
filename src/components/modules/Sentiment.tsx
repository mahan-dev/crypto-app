import WinLossBar from "../elements/SentimentGraph";
import type { CoinSentiment } from "@/types/coinTypes";
import { VscDashboard } from "react-icons/vsc";

import styles from "@/components/templates/styles/coinDetails/route.module.css";

interface SentimentProps {
  sentiment: CoinSentiment | "";
}
const Sentiment = ({ sentiment }: SentimentProps) => {
  return (
    <>
      {sentiment && (
        <div className={styles.sentiment__container}>
          <span className={styles.container__title}>
            <VscDashboard className="text-[1.3rem]" /> Community sentiment
          </span>
          <WinLossBar
            sentimentUp={sentiment.sentiment_votes_up_percentage ?? "50"}
            sentimentDown={sentiment.sentiment_votes_down_percentage ?? "50"}
          />
        </div>
      )}
    </>
  );
};

export default Sentiment;
