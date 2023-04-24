import express from "express";
import cors from "cors";
import helmet from "helmet";
import bodyParser from "body-parser";
import swaggerUi from "swagger-ui-express";
import swaggerDocument from "./utils/swaggerDocument.json";

import connectDB from "./dataBase/connectionDB";

import registerRoute from "./routes/register";
import loginRoute from "./routes/login";
import usersRoute from "./routes/users";
import teamRoute from "./routes/teams";
import eventRoute from "./routes/event";

import config from "../config";

const app = express();
const port = config.port;

connectDB
  .initialize()
  .then(() => {
    console.log("Data base has been initialized");

    // Parser
    app.use(bodyParser.urlencoded({ extended: true }));
    app.use(bodyParser.json());

    // Security
    app.use(cors());
    app.use(helmet());

    // Routes
    app.use(usersRoute);
    app.use(registerRoute);
    app.use(loginRoute);
    app.use(teamRoute);
    app.use(eventRoute);

    // Swagger
    app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocument));

    // Start app
    app.listen(port, async () => {
      console.log(`Listen on server ${port}`);
    });
  })
  .catch((error) => {
    console.error(`Error ${error}`);
  });
