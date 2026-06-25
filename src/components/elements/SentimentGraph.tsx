import { TrendingUp, TrendingDown } from "lucide-react";


interface WinLossBarProps {
  sentimentUp: number;
  sentimentDown: number;
}

const WinLossBar = ({ sentimentUp, sentimentDown }: WinLossBarProps) => {
  // Ensure the percentage stays between 0 and 100
  const statusUp = sentimentUp;
  const statusDown = sentimentDown;

  return (
    <div className="flex items-center gap-3 font-sans select-none text-sm font-semibold tracking-wide">
      <div className="flex items-center gap-1.5 text-emerald-500">
        <TrendingUp className=" stroke-[2.5]" />
        <span>{statusUp}%</span>
      </div>

      <div className="relative flex h-5 w-64 overflow-hidden rounded-full bg-slate-900">
        <div
          style={{ width: `${statusUp}%` }}
          className="h-full  bg-emerald-500 border-r-2 border-slate-950 transition-all duration-500"
        />

        <div
          style={{ width: `${statusDown}%` }}
          className="h-full bg-rose-500 transition-all duration-500"
        />
      </div>

      <div className="flex items-center gap-1.5 text-rose-500">
        <span>{statusDown}%</span>

        <TrendingDown className="stroke-[2.5]" />
      </div>
    </div>
  );
};

export default WinLossBar;
