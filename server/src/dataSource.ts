import { DataSource } from "typeorm";
import dbConfig from "../config/index";
import Team from "./models/Team";
import User from "./models/User";

const connectDB = new DataSource({
  type: "postgres",
  host: dbConfig.db_host,
  port: dbConfig.db_port,
  username: dbConfig.db_username,
  password: dbConfig.db_password,
  database: dbConfig.db_name,
  entities: [User, Team],
  migrations: ["src/migrations/**/*.ts"],
  migrationsTableName: "custom_migration_table",
  synchronize: true,
  logging: false,
});

export default connectDB;
