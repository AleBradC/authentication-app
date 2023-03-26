import express from "express";
import { Request, Response } from "express";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import * as dotenv from "dotenv";

import { User } from "../entities/User";
import { connectDB } from "../connectionDB";

dotenv.config();
const router = express.Router();

router.post("/api/register", async (req: Request, res: Response) => {
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
    // Encrypt the user password.
    const salt = await bcrypt.genSalt();
    const passwordHash = await bcrypt.hash(password, salt);

    // Create token

    // Create a user in our database.
    const user = connectDB.getRepository(User).create({
      first_name: firstName,
      last_name: lastName,
      email: email,
      password: passwordHash,
      // token: token,
    });

    await connectDB.getRepository(User).save(user);
    // return the user
    return res.status(201).json(user);
  } catch (error) {
    throw error;
  }
});

export { router as registerRoute };
