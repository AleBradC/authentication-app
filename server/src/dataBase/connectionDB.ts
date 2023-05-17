import { DataSource } from "typeorm";
import config from "../../config";

import Team from "./entities/Team";
import User from "./entities/User";

const username = config.username;
const port = config.db_port;
const host = config.db_host;
const password = config.db_password;

const connectDB = new DataSource({
  type: "postgres",
  host: host,
  port: port,
  username: username,
  database: "authentication_app",
  password: password,
  entities: [User, Team],
  migrations: ["src/migrations/**/*.ts"],
  migrationsTableName: "custom_migration_table",
  synchronize: true,
});

export default connectDB;
