import express, { NextFunction } from "express";
import { Request, Response } from "express";
import { Container } from "typedi";

import AuthService from "../services/AuthService";
import { IAuthService } from "../interfaces/services/IAuthService";

const loginRoute = express.Router();

loginRoute.post(
  "/api/login",
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const authService = Container.get<IAuthService>(AuthService);
      const response = await authService.login(req.body);

      return res.status(200).json(response);
    } catch (error) {
      return next(error);
    }
  }
);

export default loginRoute;
