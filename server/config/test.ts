import dotenv from "dotenv";
dotenv.config();

export default {
  port: process.env.PORT,
  jwt_secret: process.env.ACCESS_TOKEN_SECRET,

  // DATA BASE
  db_port: Number(process.env.DB_PORT),
  db_host: process.env.TEST_DB_HOST,
  db_password: process.env.DB_PASSWORD,
  db_username: process.env.USERNAME,
  db_name: "authentication_app_test",
};
