import express from "express";
import { Request, Response } from "express";

import connectDB from "../connectionDB";
import { User } from "../entities/User";
import authencatication from "../middlewares/authentication";

const usersRoute = express.Router();

usersRoute.get(
  "/api/users",
  authencatication,
  async (req: Request, res: Response) => {
    const result = await connectDB.getRepository(User).find();

    res.send(result);
  }
);

export default usersRoute;
