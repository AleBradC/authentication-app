import express from "express";
import { Request, Response } from "express";
import Container from "typedi";

import { AuthService } from "../services/AuthService";

const loginRoute = express.Router();

loginRoute.post("/api/login", async (req: Request, res: Response) => {
  const authService = Container.get(AuthService);

  try {
    const response = await authService.login(req.body);
    return res.status(200).json(response);
  } catch (error) {
    throw error;
  }
});

export default loginRoute;
