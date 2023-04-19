import { DataSource } from "typeorm";
import { User } from "./entities/User";
import { Team } from "./entities/Team";
import config from "../../config";

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
  synchronize: true,
});

export default connectDB;
