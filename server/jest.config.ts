import type { Config } from "jest";

const config: Config = {
  verbose: true,
  roots: ["<rootDir>/src"],
  preset: "ts-jest",
  testEnvironment: "node",
  setupFilesAfterEnv: ["./jest.setup.js"],
  coveragePathIgnorePatterns: ["/node_modules/"],
  testTimeout: 15000,
};

export default config;
