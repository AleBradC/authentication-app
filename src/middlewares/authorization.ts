import { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";
import config from "../../config";

import { WARNINGS } from "../utils/constants/warnings";

const jwt_secret = config.jwt_secret;

const authorization = (req: Request, res: Response, next: NextFunction) => {
  const token = req.header("Authorization");

  if (!token) {
    res.status(401).send(WARNINGS.NO_TOKEN);
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
