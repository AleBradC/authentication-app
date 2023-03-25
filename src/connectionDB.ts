import { DataSource } from "typeorm";
import { User } from "./entities/User";

export const connectDB = new DataSource({
  type: "postgres",
  host: process.env.HOST,
  port: 5432,
  username: process.env.USERNAME,
  database: "authentication_app",
  password: undefined,
  entities: [User],
  synchronize: true,
});
