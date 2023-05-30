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
    const authHeader = req.headers["authorization"]?.split(" ")[1] as string;

    if (!authHeader) {
      return res.status(STATUS_CODE.UNAUTHORIZED).json({
        message: AUTH.NO_TOKEN,
      });
    }

    jwt.verify(authHeader, jwt_secret!, (error, decoded) => {
      if (error) {
        return res.status(STATUS_CODE.UNAUTHORIZED).json({
          message: AUTH.INVALID_TOKEN,
        });
      }

      req.body.data = decoded;
      next();
    });
  } catch (error) {
    throw new CustomError(error.statusCode, error.message);
  }
};

export default authorizationMiddleware;
