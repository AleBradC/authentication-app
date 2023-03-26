import { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";
import * as dotenv from "dotenv";

dotenv.config();

const authencatication = (req: Request, res: Response, next: NextFunction) => {
  try {
    const authHeader = req.headers["authorization"];
    if (!authHeader) {
      res.status(401).json("Unauthorized");
    }
    const token = authHeader!.split(" ")[1];
    const decode = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET as string);
    req.body.user = decode;
  } catch (error) {
    return res.status(404).json("some error");
  }

  return next();
};

export default authencatication;
