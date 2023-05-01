import { Router } from "express";
import { Request, Response } from "express";
import { EventEmitter } from "events";

const eventEmitter = new EventEmitter();

const eventRoute = Router();

eventRoute.get("/api/stream", (req: Request, res: Response) => {
  res.setHeader("Content-Type", "text/event-stream");
  res.setHeader("Cache-Control", "no-cache");
  res.setHeader("Connection", "keep-alive");

  const listener = (data: string) => {
    res.write(`data: ${JSON.stringify(data)}\n\n`);
  };
  eventEmitter.on("message", listener);

  // Remove the listener when the client disconnects
  req.on("close", () => {
    eventEmitter.off("message", listener);
  });
});

export { eventRoute, eventEmitter };
