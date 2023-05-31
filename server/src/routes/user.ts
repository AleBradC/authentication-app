import express from "express";
import { Request, Response, NextFunction } from "express";
import { Container } from "typedi";

import UsersService from "../services/UsersService";
import { STATUS_CODE } from "../utils/constants/statusCode";
import { USER_VALIDATION } from "../utils/constants/validations";

const usersRoute = express.Router();

const userService = Container.get(UsersService);

usersRoute.get(
  "/api/users",
  async (_req: Request, res: Response, next: NextFunction) => {
    try {
      const users = await userService.getAllUsers();

      if (!users) {
        return res.status(STATUS_CODE.NOT_FOUND).json({
          message: USER_VALIDATION.NO_USERS,
        });
      }

      return res.status(STATUS_CODE.OK).json(users);
    } catch (error) {
      return next(error);
    }
  }
);

usersRoute.get(
  "/api/users/:id",
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { id } = req.params;
      const userById = await userService.getUserById(id);

      if (!userById) {
        return res.status(STATUS_CODE.NOT_FOUND).json({
          message: USER_VALIDATION.USER_NOT_FOUND,
        });
      }

      return res.status(STATUS_CODE.OK).json(userById);
    } catch (error) {
      return next(error);
    }
  }
);

export default usersRoute;
