import { ferAndGreedApi } from "@/services/coingecko";
import { useQuery } from "@tanstack/react-query";
import { GaugeComponent } from "react-gauge-component";

const ReactGauge = () => {
  const { data } = useQuery({
    queryKey: ["fearAndGreed"],
    queryFn: async () => ferAndGreedApi(),
  });

  console.log(data.data[0].value)

  return (
    <GaugeComponent
      value={data.data[0].value}
      type="semicircle"
      minValue={0}
      maxValue={100}
      arc={{
        width: 0.2,
        padding: 0.04,
        cornerRadius: 60,
        subArcs: [],
        colorArray: ["#EA4228", "#f5981b", "#e6eb25", "#88db35", "#1af7e0"],
        nbSubArcs: 5,
      }}
      pointer={{
        type: "needle",
        color: "#e0e0e0",
        length: 0.7,
        width: 8,
        maxFps: 60,
      }}
      labels={{
        valueLabel: {
          formatTextValue: (e) => "".concat(e.toFixed(1), "\xb0C"),
          style: {
            fontSize: "20px",
            fill: "#e0e0e0",
            fontWeight: "bold",
          },
        },
        tickLabels: {
          type: "outer",
          defaultTickValueConfig: {
            formatTextValue: (e) => "".concat(e, "\xb0"),
            style: { fontSize: "9px", fill: "#aaa" },
          },
          defaultTickLineConfig: { color: "#666", length: 4, width: 1 },
        },
      }}
    />
  );
};

export default ReactGauge;
