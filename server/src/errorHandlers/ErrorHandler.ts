import { STATUS_CODE } from "../utils/constants/statusCode";

// more specific errors (e.g. validation errors), in catch block
class CustomError extends Error {
  public readonly statusCode: STATUS_CODE;

  constructor(statusCode: STATUS_CODE, message: string) {
    super(message);

    Object.setPrototypeOf(this, CustomError.prototype);

    this.statusCode = statusCode;
  }
}

export default CustomError;
