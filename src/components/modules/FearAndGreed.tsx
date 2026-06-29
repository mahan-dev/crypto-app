import { fearAndGreedApi } from "@/services/coingecko";
import { useQuery } from "@tanstack/react-query";
import { GaugeComponent } from "react-gauge-component";
import styles from "@/components/modules/css/fearAndGreed/route.module.css";
import Loader from "../loader/Loader";

const FearAndGreed = () => {
  const { data, isError, isLoading } = useQuery({
    queryKey: ["fearAndGreed"],
    queryFn: async () => fearAndGreedApi(),
  });

  const status = data?.data[0].value_classification;

  return (
    <section className={styles.gauge}>
      {isLoading && <Loader />}
      {isError && <h2>Failed ... 😞</h2>}

      {data && (
        <>
          <h4 className={styles.gauge__title}>Fear & Greed</h4>
          <div className={styles.gauge__content}>
            <GaugeComponent
              value={data?.data[0].value}
              type="semicircle"
              minValue={0}
              maxValue={100}
              arc={{
                width: 0.1,
                padding: 0.02,
                cornerRadius: 60,
                subArcs: [],
                colorArray: [
                  "#EA4228",
                  "#f5981b",
                  "#e6eb25",
                  "#88db35",
                  "#1af7e0",
                ],
                nbSubArcs: 5,
              }}
              pointer={{
                type: "blob",
                color: "#e0e0e0",
                strokeWidth: 3,
                strokeColor: "#252525",
                width: 25,
                maxFps: 60,
              }}
              labels={{
                valueLabel: {
                  style: {
                    fontSize: "50px",
                    display: "none",
                    fill: "#e0e0e0",
                    fontWeight: "bold",
                  },
                },
                tickLabels: {
                  type: "outer",
                  hideMinMax: true,
                  defaultTickValueConfig: {
                    style: { fontSize: "9px", fill: "#aaa" },
                  },
                  defaultTickLineConfig: { color: "#666", length: 4, width: 1 },
                },
              }}
            />

            <p className={styles.content__display}>
              <span className={styles.display__value}>
                {data?.data[0].value}
              </span>
              <span className={styles.display__status}>{status}</span>
            </p>
          </div>
        </>
      )}
    </section>
  );
};

export default FearAndGreed;
