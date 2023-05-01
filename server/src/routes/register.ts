import express from "express";
import { Request, Response } from "express";
import Container from "typedi";

import { AuthService } from "../services/AuthService";

const registerRoute = express.Router();

const authService = Container.get(AuthService);

registerRoute.post("/api/register", async (req: Request, res: Response) => {
  try {
    const response = await authService.register(req.body);
    return res.status(200).json(response);
  } catch (error) {
    return error;
  }
});

export default registerRoute;