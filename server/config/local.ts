import dotenv from "dotenv";
dotenv.config();

export default {
  port: process.env.PORT,
  jwt_secret: process.env.ACCESS_TOKEN_SECRET,

  // DATABASE
  db_port: Number(process.env.DB_PORT),
  db_host: "postgresql-local",
  db_password: "postgres",
  db_username: "postgres",
  db_name: "postgres",
};
