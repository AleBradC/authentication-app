import { NextFunction, Request, Response } from "express";

interface Error {
  statusCode: number;
  message: string;
}

export const errorHandler = (
  err: Error,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const errorStatus = err.statusCode || 500;
  const errMsg = err.message || "Something went wrong";

  res.status(errorStatus).json({
    success: false,
    status: errorStatus,
    message: errMsg,
  });
};
