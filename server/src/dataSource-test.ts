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
  database: "authentication_app_test",
  entities: [User, Team],
  migrations: ["src/migrations/**/*.ts"],
  migrationsTableName: "custom_migration_table",
  synchronize: true,
  logging: false,
});

export default testConnectDB;
