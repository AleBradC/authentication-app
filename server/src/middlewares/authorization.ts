import { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";
import config from "../../config";

import { AUTH } from "../utils/constants/validations";

const jwt_secret = config.jwt_secret;

const authorizationMiddleware = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const token = req.headers["authorization"] as string;

    if (!token) {
      res.status(401).send(AUTH.NO_TOKEN);
      return;
    }

    const decoded = jwt.verify(token, jwt_secret!);
    req.body.data = decoded;
    next();
  } catch (err) {
    res.status(401).send(AUTH.INVALID_TOKEN);
  }
};

export default authorizationMiddleware;
