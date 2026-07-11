import type { Config } from "jest";

const config: Config = {
  testEnvironment: "jsdom",

  transform: {
    "^.+\\.(ts|tsx|js|jsx)$": "babel-jest",
  },

  moduleNameMapper: {
    "^@/(.*)$": "<rootDir>/src/$1",
  },

  moduleFileExtensions: ["ts", "tsx", "js", "jsx", "json"],
};

export default config;