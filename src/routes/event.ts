import express from "express";
import { Request, Response } from "express";

const eventRoute = express.Router();

eventRoute.get("/api/stream", (_req: Request, res: Response) => {
  try {
    res.setHeader("Cache-Control", "no-cache");
    res.setHeader("Content-Type", "text/event-stream");
    res.setHeader("Connection", "keep-alive");
    res.setHeader("Access-Control-Allow-Origin", "*");

    setInterval(() => {
      const data = { message: `Hello! (${new Date().toISOString()})` };
      console.log(data);

      res.write(`data: ${JSON.stringify(data)}\n\n`);
    }, 1000);
  } catch (error) {
    console.log(error);
  }
});

export default eventRoute;
