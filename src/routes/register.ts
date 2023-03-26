import express from "express";
import { Request, Response } from "express";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import * as dotenv from "dotenv";

import connectDB from "../connectionDB";
import { User } from "../entities/User";

dotenv.config();

const registerRoute = express.Router();

registerRoute.post("/api/register", async (req: Request, res: Response) => {
  try {
    const { firstName, lastName, email, password } = req.body;

    if (!(firstName && lastName && email && password)) {
      return res.status(400).send("All inputs are required");
    }

    const existedUser = await connectDB.getRepository(User).findOneBy({
      email: email,
    });

    if (existedUser) {
      return res.status(409).send("User already exists");
    }

    const salt = await bcrypt.genSalt();
    const passwordHash = await bcrypt.hash(password, salt);

    const user = connectDB.getRepository(User).create({
      first_name: firstName,
      last_name: lastName,
      email: email,
      password: passwordHash,
    });

    const accesToken = jwt.sign(
      { user: user.id },
      process.env.ACCESS_TOKEN_SECRET as string,
      { expiresIn: "2h" }
    );
    user.token = accesToken;

    await connectDB.getRepository(User).save(user);
    return res.status(201).json(user);
  } catch (error) {
    throw error;
  }
});

export default registerRoute;
