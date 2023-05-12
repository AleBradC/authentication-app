import type { Config } from "jest";

const config: Config = {
  verbose: true,
  roots: ["<rootDir>/src"],
  preset: "ts-jest",
  testEnvironment: "node",
  transform: { "^.+\\.(ts|tsx)$": "ts-jest" },
  setupFilesAfterEnv: ["./jest.setup.js"],
  coveragePathIgnorePatterns: ["/node_modules/"],
};

export default config;
