import { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";
import config from "../../config";

const jwt_secret = config.jwt_secret;

const authMiddleware = (req: Request, res: Response, next: NextFunction) => {
  const token = req.header("x-auth-token");

  if (!token) {
    return res.status(403).send("A token is required for authentication");
  }

  try {
    const decoded = jwt.verify(token, jwt_secret!);

    req.body = decoded;
  } catch (err) {
    return res.status(401).send("Invalid Token");
  }
  return next();
};

export default authMiddleware;
