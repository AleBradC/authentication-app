import express from "express";
import { Request, Response } from "express";
import { Container } from "typedi";

import UsersService from "../services/UsersService";

const usersRoute = express.Router();

const userService = Container.get(UsersService);

usersRoute.get("/api/users", async (_req: Request, res: Response) => {
  try {
    const result = await userService.getAllUsers();
    return res.status(200).send(result);
  } catch (err) {
    return err;
  }
});

usersRoute.get("/api/users/:id", async (req: Request, res: Response) => {
  try {
    const { id } = req.params;

    const result = await userService.getUserById(id);
    return res.status(200).send(result);
  } catch (error) {
    return error;
  }
});

export default usersRoute;
