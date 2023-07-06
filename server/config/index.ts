import config from "../config/local";
import testConfig from "../config/test";

const environment = process.env.NODE_ENV || "development";
let dbConfig;
console.log(environment);
if (environment === "test") {
  dbConfig = testConfig;
} else {
  dbConfig = config;
}

export default dbConfig;
