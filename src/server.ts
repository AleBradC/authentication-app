import express from "express";
import cors from "cors";
import helmet from "helmet";

import connectDB from "./dataBase/connectionDB";
import registerRoute from "./routes/register";
import loginRoute from "./routes/login";
import usersRoute from "./routes/users";
import teamRoute from "./routes/teams";
import config from "../config";

const app = express();
const port = config.port;

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
    app.use(teamRoute);

    app.listen(port, () => {
      console.log(`Listen on server ${port}`);
    });
  })
  .catch((error) => {
    console.error(`Error ${error}`);
  });
