import { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";
import config from "../../config";

import { AUTH } from "../utils/constants/validations";
import { STATUS_CODE } from "../utils/constants/statusCode";
import CustomError from "../errorHandlers/ErrorHandler";

const jwt_secret = config.jwt_secret;

const authorizationMiddleware = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const token = req.headers["authorization"] as string;

    if (!token) {
      res.status(STATUS_CODE.UNAUTHORIZED).json({
        message: AUTH.NO_TOKEN,
      });

      return;
    }

    const decoded = jwt.verify(token, jwt_secret!);
    req.body.data = decoded;
    next();
  } catch (error) {
    if (error instanceof CustomError) {
      throw new CustomError(error.statusCode, error.message);
    } else {
      throw new CustomError(STATUS_CODE.UNAUTHORIZED, AUTH.INVALID_TOKEN);
    }
  }
};

export default authorizationMiddleware;
