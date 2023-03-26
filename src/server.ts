import express from "express";
import cors from "cors";
import helmet from "helmet";
import * as dotenv from "dotenv";

import connectDB from "./dataBase/connectionDB";
import registerRoute from "./routes/register";
import loginRoute from "./routes/login";
import usersRoute from "./routes/users";

dotenv.config();
const PORT = process.env.PORT;

const app = express();

connectDB
  .initialize()
  .then(() => {
    console.log("Data base has been initialized");

    app.use(express.json());
    app.use(cors());
    app.use(helmet());

    app.use(usersRoute);
    app.use(registerRoute);
    app.use(loginRoute);

    app.listen(PORT, () => {
      console.log(`Listen on server ${PORT}`);
    });
  })
  .catch((error) => {
    console.error(`Error ${error}`);
  });
