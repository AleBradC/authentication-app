import express from "express";
import * as dotenv from "dotenv";

import { connectDB } from "./connectionDB";
import { getUsersRoute } from "./routes/getUsers";

dotenv.config();
const PORT = process.env.PORT;

const app = express();

connectDB
  .initialize()
  .then(() => {
    console.log("Data base has been initialized");

    app.use(express.json());
    app.use(getUsersRoute);

    app.listen(PORT, () => {
      console.log(`Listen on server ${PORT}`);
    });
  })
  .catch((error) => {
    console.error(`Error ${error}`);
  });
