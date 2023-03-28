import express from "express";
import { Request, Response } from "express";
import "reflect-metadata";
import { Container } from "typedi";

import { UsersService } from "../services/UsersService";
import authencatication from "../middlewares/authentication";

const usersRoute = express.Router();

usersRoute.get("/api/users", async (req: Request, res: Response) => {
  const userService = Container.get(UsersService);
  const result = await userService.getAllUsers();

  return res.send(result);
});

export default usersRoute;
