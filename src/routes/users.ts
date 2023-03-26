import express from "express";
import { Request, Response } from "express";

const router = express.Router();

router.get("/api/users", (req: Request, res: Response) => {
  return res.status(200).send("TEST");
});

export { router as userRoute };
