import { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";
import config from "../../config";

import { GENERAL_VALIDATION } from "../utils/constants/validations";

const jwt_secret = config.jwt_secret;

const authorization = (req: Request, res: Response, next: NextFunction) => {
  const token = req.headers["authorization"] as string;

  if (!token) {
    res.status(401)?.send(GENERAL_VALIDATION.NO_TOKEN);
    return;
  } else {
    try {
      const decoded = jwt.verify(token, jwt_secret!);
      req.body.data = decoded;

      next();
    } catch (err) {
      console.log(err);
    }
  }
};

export default authorization;
