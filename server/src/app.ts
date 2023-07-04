import "reflect-metadata";
import express, { Application } from "express";
import cors from "cors";
import helmet from "helmet";
import bodyParser from "body-parser";
import swaggerUi from "swagger-ui-express";
import swaggerDocument from "./swaggerDocument.json";
import { Container } from "typedi";

import registerRoute from "./routes/register";
import loginRoute from "./routes/login";
import usersRoute from "./routes/user";
import teamRoute from "./routes/team";
import { eventRoute } from "./routes/event";
import AuthService from "./services/AuthService";
import TeamService from "./services/TeamService";
import UsersService from "./services/UsersService";
import PostgressTeamRepository from "./repositories/PostgressTeamRepository";
import PostgresUserRepository from "./repositories/PostgresUserRepository";
import errorHandlerMiddleware from "./middlewares/errorHandler";

const app: Application = express();
Container.set("IAuthService", AuthService);
Container.set("IUsersService", UsersService);
Container.set("ITeamService", TeamService);
Container.set("ITeamRepositoryLayer", PostgressTeamRepository);
Container.set("IUserRepositoryLayer", PostgresUserRepository);

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

// Error middleware
app.use(errorHandlerMiddleware);

// Swagger
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocument));

export default app;
