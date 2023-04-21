import express from "express";
import { Request, Response } from "express";
import Container from "typedi";

import { AuthService } from "../services/AuthService";

const registerRoute = express.Router();

registerRoute.post("/api/register", async (req: Request, res: Response) => {
  const authService = Container.get(AuthService);

  try {
    const { userName, email, password } = req.body;

    if (!(userName && email && password)) {
      return res.status(400).send("All inputs are required");
    }

    const details = {
      user_name: userName,
      email: email,
      password: password,
    };

    const response = await authService.register(details);

    return res.status(200).json({ accessToken: response });
  } catch (error) {
    throw error;
  }
});

export default registerRoute;
