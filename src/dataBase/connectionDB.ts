import { DataSource } from "typeorm";
import { User } from "./entities/User";
import config from "../../config";

const host = config.host;
const username = config.username;

const connectDB = new DataSource({
  type: "postgres",
  host: host,
  port: 5432,
  username: username,
  database: "authentication_app",
  password: undefined,
  entities: [User],
  synchronize: true,
});

export default connectDB;
