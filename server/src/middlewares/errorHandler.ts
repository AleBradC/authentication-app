import { NextFunction, Request, Response } from "express";
import { GENERAL_ERROR_MESSAGE } from "../utils/constants/errorMessage";
import { STATUS_CODE } from "../utils/constants/statusCode";

// for routes errors
const errorHandlerMiddleware = (
  err: Error,
  _req: Request,
  res: Response,
  _next: NextFunction
) => {
  const statusCode = STATUS_CODE.INTERNAL_SERVER;
  const errorMessage =
    GENERAL_ERROR_MESSAGE.INTERNAL_SERVER_MESG || err.message;

  return res.status(statusCode).json({
    error: statusCode,
    message: errorMessage,
  });
};

export default errorHandlerMiddleware;
