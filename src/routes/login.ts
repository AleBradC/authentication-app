import express from "express";
import { Request, Response } from "express";

const router = express.Router();

router.post("/api/login", (req: Request, res: Response) => {});

export { router as loginRoute };
