import dotenv from "dotenv";

dotenv.config();

export default {
  port: process.env.PORT,
  username: process.env.USERNAME,

  jwt_secret: process.env.ACCESS_TOKEN_SECRET,
  db_port: Number(process.env.DB_PORT || "5432"),
  db_host: process.env.DB_HOST || "",
  db_password: process.env.DB_PASSWORD || "",

  test_db_port: Number(process.env.TEST_DB_PORT || "5432"),
  test_db_host: process.env.TEST_DB_HOST || "",
  test_db_password: process.env.DB_PASSWORD || "",
};
