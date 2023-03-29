import express from "express";
import { Request, Response } from "express";
import Container from "typedi";

import { AuthService } from "../services/AuthService";

const registerRoute = express.Router();

registerRoute.post("/api/register", async (req: Request, res: Response) => {
  const authService = Container.get(AuthService);

  try {
    const { firstName, lastName, email, password } = req.body;

    if (!(firstName && lastName && email && password)) {
      return res.status(400).send("All inputs are required");
    }

    const response = await authService.register({
      firstName: firstName,
      lastName: lastName,
      email: email,
      password: password,
    });

    return res.status(200).json(response);
  } catch (error) {
    throw error;
  }
});

export default registerRoute;
