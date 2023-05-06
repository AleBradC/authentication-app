import express from "express";
import cors from "cors";
import helmet from "helmet";
import bodyParser from "body-parser";
import swaggerUi from "swagger-ui-express";
import swaggerDocument from "./utils/swaggerDocument.json";

import registerRoute from "./routes/register";
import loginRoute from "./routes/login";
import usersRoute from "./routes/users";
import teamRoute from "./routes/teams";
import { eventRoute } from "./routes/event";

const app = express();

// Parser
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// Security
app.use(
  cors({
    origin: "http://localhost:3000",
  })
);
app.use(helmet());

// Routes
app.use(usersRoute);
app.use(registerRoute);
app.use(loginRoute);
app.use(teamRoute);
app.use(eventRoute);

// Swagger
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocument));

export default app;
