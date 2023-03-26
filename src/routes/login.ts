import express from "express";
import { Request, Response } from "express";

const loginRoute = express.Router();

loginRoute.post("/api/login", (req: Request, res: Response) => {});

export default loginRoute;
