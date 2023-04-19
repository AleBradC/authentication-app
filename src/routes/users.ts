import express from "express";
import { Request, Response } from "express";
import { Container } from "typedi";

import UsersService from "../services/UsersService";

const usersRoute = express.Router();

usersRoute.get("/api/users", async (_req: Request, res: Response) => {
  const userService = Container.get(UsersService);

  const result = await userService.getAllUsers();

  return res.status(200).send(result);
});

export default usersRoute;
