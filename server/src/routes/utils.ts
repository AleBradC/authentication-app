import { Request, Response } from "express";
import CustomError from "../errorHandlers/ErrorHandler";

export const sendEvent = (_req: Request, res: Response, data: string) => {
  try {
    res.setHeader("Cache-Control", "no-cache");
    res.setHeader("Content-Type", "text/event-stream");
    res.setHeader("Connection", "keep-alive");
    res.setHeader("Access-Control-Allow-Origin", "*");

    res.write(`data: ${JSON.stringify(data)}\n\n`);
  } catch (error) {
    throw new CustomError(error.statusCode, error.message);
  }
};
