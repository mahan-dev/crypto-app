const T = 100000000000;
const B = 1000000000;
const M = 1000000;
const K = 10000;

const ValueChecker = (value: number) => {
  return value ?? "null";
};

const formatPrice = (value: number) => {
  const formattedPart = Math.trunc(value);

  if (formattedPart) {
    if (value >= T) return `${(value / T).toFixed(2)} T`;
    if (value >= B) return `${(value / B).toFixed(2)} B`;
    if (value >= M) return `${(value / M).toFixed(2)} M`;
    if (value >= K) return `${(value / K).toFixed(2)} K`;
  } else {
    if (value > 0) return `${value.toFixed(2)}`;
    return "null";
  }
};

export { formatPrice, ValueChecker };
