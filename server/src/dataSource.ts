import { DataSource } from "typeorm";
import config from "../config";

import Team from "./models/Team";
import User from "./models/User";

const connectDB = new DataSource({
  type: "postgres",
  host: config.db_host,
  port: config.db_port,
  username: config.username,
  database: "authentication_app",
  password: config.db_password,
  entities: [User, Team],
  migrations: ["src/migrations/**/*.ts"],
  migrationsTableName: "custom_migration_table",
  synchronize: true,
});

export default connectDB;
