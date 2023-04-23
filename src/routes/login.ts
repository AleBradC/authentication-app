import express from "express";
import { Request, Response } from "express";
import Container from "typedi";

import { AuthService } from "../services/AuthService";

const loginRoute = express.Router();

loginRoute.post("/api/login", async (req: Request, res: Response) => {
  const authService = Container.get(AuthService);
  const { email, password } = req.body;

  try {
    if (!(email && password)) {
      return res.status(400).send("All inputs are required");
    }

    const response = await authService.login(req.body);
    return res.status(200).json({ accessToken: response });
  } catch (error) {
    throw error;
  }
});

export default loginRoute;
