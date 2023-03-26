import express from "express";
import { Request, Response } from "express";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import * as dotenv from "dotenv";

import connectDB from "../dataBase/connectionDB";
import { User } from "../dataBase/entities/User";

dotenv.config();
const loginRoute = express.Router();

loginRoute.post("/api/login", async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;

    if (!(email && password)) {
      return res.status(400).send("All inputs are required");
    }

    const user = await connectDB.getRepository(User).findOneBy({ email });
    if (user) {
      const comparePassword = await bcrypt.compare(password, user.password);

      if (comparePassword) {
        const token = jwt.sign(
          { user: user.id, email },
          process.env.ACCESS_TOKEN_SECRET as string,
          { expiresIn: "2h" }
        );

        user.token = token;
        return res.status(202).json(user);
      }
    }
    return res.status(400).send("Invalid credential");
  } catch (error) {
    throw error;
  }
});

export default loginRoute;
