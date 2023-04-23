import express from "express";
import { Request, Response } from "express";
import jwt from "jsonwebtoken";

const logoutRoute = express.Router();

logoutRoute.put("/api/logout", async (req: Request, res: Response) => {
  const authHeader = req.headers["Authorization"];

  jwt.sign(authHeader!, "", { expiresIn: 1 }, (logout, err) => {
    if (logout) {
      res.status(200).json("You have been logged out");
    }
    res.status(500).json("Something went wrong");
  });
});

export default logoutRoute;
