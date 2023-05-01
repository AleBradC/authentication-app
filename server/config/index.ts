import dotenv from "dotenv";

dotenv.config();

export default {
  port: process.env.PORT,
  host: process.env.HOST,
  username: process.env.USERNAME,

  jwt_secret: process.env.ACCESS_TOKEN_SECRET,
};
