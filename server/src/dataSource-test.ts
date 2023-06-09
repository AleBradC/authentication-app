import { DataSource } from "typeorm";
import config from "../config";

import Team from "./models/Team";
import User from "./models/User";

const testConnectDB = new DataSource({
  type: "postgres",
  host: config.test_db_host,
  port: config.test_db_port,
  username: config.username,
  password: config.test_db_password,
  database: "authentication_app_test", // Use a different database name for tests
  entities: [User, Team],
  migrations: ["src/migrations/**/*.ts"],
  migrationsTableName: "custom_migration_table",
  synchronize: true, // You might want to set this to `false` for production-like behavior in tests
  logging: false,
});

export default testConnectDB;
