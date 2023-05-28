import { GENERAL_ERROR_MESSAGE } from "src/utils/constants/errorMessage";
import { STATUS_CODE } from "src/utils/constants/statusCode";

// for custom errors, more specific errors (e.g. validation errors)
class CustomError extends Error {
  public readonly statusCode: STATUS_CODE;

  constructor(statusCode: STATUS_CODE, message: GENERAL_ERROR_MESSAGE) {
    super(message);

    Object.setPrototypeOf(this, CustomError.prototype);

    this.statusCode = statusCode;
  }
}
