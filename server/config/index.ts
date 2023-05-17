import dotenv from "dotenv";

dotenv.config();

export default {
  port: process.env.PORT,
  username: process.env.USERNAME,

  jwt_secret: process.env.ACCESS_TOKEN_SECRET,
  db_port: Number(process.env.DB_PORT || ""),
  db_host: process.env.DB_HOST || "",
  db_password: process.env.DB_PASSWORD || "",
};
