import express, { NextFunction } from "express";
import { Request, Response } from "express";
import { Container } from "typedi";

import AuthService from "../services/AuthService";
import { USER_VALIDATION } from "../utils/constants/validations";
import { STATUS_CODE } from "../utils/constants/statusCode";
import { IAuthResponse } from "../interfaces/services/IAuthResponse";

const registerRoute = express.Router();

registerRoute.post(
  "/api/register",
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const authService = Container.get(AuthService);
      const { user_name, email, password } = req.body;

      if (!user_name || !email || !password) {
        return res.status(STATUS_CODE.BAD_REQUEST).json({
          message: USER_VALIDATION.EMPTY_INPUTS,
        });
      }
      const response = (await authService.register(req.body)) as IAuthResponse;

      return res.status(response.statusCode).json({
        message: response.message,
      });
    } catch (error) {
      return next(error);
    }
  }
);

export default registerRoute;
