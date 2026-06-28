import { ferAndGreedApi } from "@/services/coingecko";
import { useQuery } from "@tanstack/react-query";
import { GaugeComponent } from "react-gauge-component";

const ReactGauge = () => {
  const { data } = useQuery({
    queryKey: ["fearAndGreed"],
    queryFn: async () => ferAndGreedApi(),
  });

  console.log(data?.data[0].value);

  const status = data?.data[0].value_classification;

  return (
    <section className="w-fit bg-red-500  rounded-lg px-4 py-2">
      <span className="font-medium">Fear & Greed</span>
      <div className="flex justify-center relative w-35 h-20">
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
            colorArray: ["#EA4228", "#f5981b", "#e6eb25", "#88db35", "#1af7e0"],
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
              //  formatTextValue: (value) => `${value}\nFear & Greed`,
              // formatTextValue: (e) => "".concat(e.toFixed(0)),
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
                // formatTextValue: (e) => "".concat(e, "\xb0"),
                style: { fontSize: "9px", fill: "#aaa" },
              },
              defaultTickLineConfig: { color: "#666", length: 4, width: 1 },
            },
          }}
        />

        <p className="flex flex-col items-center absolute text-[0.8rem] top-[38%] ">
          <span className="text-[1.2rem] font-bold">{data?.data[0].value}</span>
          <span className="text-[0.7rem]">{status}</span>
        </p>
      </div>
    </section>
  );
};

export default ReactGauge;
