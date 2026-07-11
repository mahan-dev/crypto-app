import { currencyHandler } from "@/helper/coinsList/currencyHandler";

describe(" test currency", () => {
  it("should check currency", () => {
    expect(currencyHandler(123.23, "usd")).toBe(`$123`);
  });
});
