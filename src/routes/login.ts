import express from "express";
import { Request, Response } from "express";
import Container from "typedi";

import { AuthService } from "../services/AuthService";

const loginRoute = express.Router();

loginRoute.post("/api/login", async (req: Request, res: Response) => {
  const authService = Container.get(AuthService);

  try {
    const { email, password } = req.body;

    if (!(email && password)) {
      return res.status(400).send("All inputs are required");
    }

    const response = await authService.login({
      email: email,
      password: password,
    });

    return res.status(200).json(response);
  } catch (error) {
    throw error;
  }
});

export default loginRoute;
