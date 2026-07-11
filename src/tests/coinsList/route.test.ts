import {
  currencyHandler,
  currencyList,
} from "@/helper/coinsList/currencyHandler";
import {
  coinPriceSorting,
  PriceCommaFormatter,
  symbolFormatter,
} from "@/helper/coinsList/formattedData";
import { statusHelperHandler } from "@/helper/coinsList/statusHandlerHelper";
import type { MarketType } from "@/types/marketTypes";

describe(" test currency", () => {
  it("should check currency", () => {
    expect(currencyHandler(123.23, "usd")).toBe(`${currencyList["usd"]}123`);
  });
  it("should check currency", () => {
    expect(currencyHandler(123.23, "gbp")).toBe(`${currencyList["gbp"]}123`);
  });
  it("should check currency", () => {
    expect(currencyHandler(123.23, "eur")).toBe(`${currencyList["eur"]}123`);
  });
});

describe("priceCommaFormatter", () => {
  it("should validate the param", () => {
    expect(+PriceCommaFormatter(23.23)).toBe(23);
  });
});

describe("symbolFormatter", () => {
  it("should return UpperCase form before _", () => {
    expect(symbolFormatter("btc_usdt")).toBe("BTC");
  });
});

const mockedData = [
  {
    id: "bitcoin",
    symbol: "btc",
    name: "Bitcoin",
    image: "",
    market_cap: 100000,
    market_cap_rank: 1,
    current_price: 30000,
    circulating_supply: 100,
    market_cap_change_percentage_24h: 5,
    fully_diluted_valuation: 0,
    total_volume: 0,
    total_supply: 0,
    max_supply: 0,
    ath: 0,
    atl: 0,
  },
  {
    id: "ethereum",
    symbol: "eth",
    name: "Ethereum",
    image: "",
    market_cap: 50000,
    market_cap_rank: 2,
    current_price: 2000,
    circulating_supply: 200,
    market_cap_change_percentage_24h: -2,
    fully_diluted_valuation: 0,
    total_volume: 0,
    total_supply: 0,
    max_supply: 0,
    ath: 0,
    atl: 0,
  },
] satisfies MarketType["data"];

describe("coinPriceSorting", () => {
  it("should sort ascending", () => {
    const result = coinPriceSorting(mockedData, "up", "price");
    expect(result[0].id).toBe("ethereum");
    expect(result[1].id).toBe("bitcoin");
  });
  it("should sort descending", () => {
    const result = coinPriceSorting(mockedData, "down", "price");
    expect(result[0].id).toBe("bitcoin");
    expect(result[1].id).toBe("ethereum");
  });
});

describe("status helper test", () => {
  it("should test the status helper", () => {
    const setSortOrder = jest.fn();
    const setSortField = jest.fn();

    statusHelperHandler("price", "price", setSortOrder, setSortField)
    expect(setSortOrder).toHaveBeenCalled()
    expect(setSortField).not.toHaveBeenCalled()
  });


});
