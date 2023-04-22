import express from "express";
import { Request, Response } from "express";
import Container from "typedi";

import { AuthService } from "../services/AuthService";

const registerRoute = express.Router();

registerRoute.post("/api/register", async (req: Request, res: Response) => {
  const authService = Container.get(AuthService);
  const { user_name, email, password } = req.body;

  try {
    if (!(user_name && email && password)) {
      return res.status(400).send("All inputs are required");
    }

    const response = await authService.register(req.body);
    return res.status(200).json({ accessToken: response });
  } catch (error) {
    throw error;
  }
});

export default registerRoute;
