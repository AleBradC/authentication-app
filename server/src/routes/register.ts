import express from "express";
import { Request, Response } from "express";
import Container from "typedi";

import { IAuthService } from "src/interfaces/services/IAuthService";

const registerRoute = express.Router();

registerRoute.post("/api/register", async (req: Request, res: Response) => {
  try {
    const authService = Container.get<IAuthService>("IAuthService");

    const response = await authService.register(req.body);
    return res.status(200).json(response);
  } catch (error) {
    return error;
  }
});

export default registerRoute;
