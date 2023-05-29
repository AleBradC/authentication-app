import express, { NextFunction } from "express";
import { Request, Response } from "express";
import { Container } from "typedi";

import AuthService from "../services/AuthService";
import { IAuthService } from "../interfaces/services/IAuthService";
import { STATUS_CODE } from "../utils/constants/statusCode";
import { USER_VALIDATION } from "../utils/constants/validations";

const loginRoute = express.Router();

loginRoute.post(
  "/api/login",
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const authService = Container.get<IAuthService>(AuthService);
      const { email, password } = req.body;

      if (!(email && password)) {
        return res.status(STATUS_CODE.BAD_REQUEST).json({
          message: USER_VALIDATION.EMPTY_INPUTS,
        });
      }

      const response = await authService.login(req.body);

      return res.status(STATUS_CODE.OK).json({
        access_token: response,
      });
    } catch (error) {
      return next(error);
    }
  }
);

export default loginRoute;
