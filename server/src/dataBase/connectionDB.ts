import { DataSource } from "typeorm";
import config from "../../config";

import Team from "./entities/Team";
import User from "./entities/User";

const host = config.host;
const username = config.username;

const connectDB = new DataSource({
  type: "postgres",
  host: host,
  port: 5433,
  username: username,
  database: "authentication_app",
  password: undefined,
  entities: [User, Team],
  migrations: ["src/migrations/**/*.ts"],
  migrationsTableName: "custom_migration_table",
  synchronize: false,
});

export default connectDB;
