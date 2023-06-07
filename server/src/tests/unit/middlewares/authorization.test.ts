import { Request, Response } from "express";
import jwt from "jsonwebtoken";

import authorizationMiddleware from "../../../middlewares/authorization";
import config from "../../../../config";
import { AUTH } from "../../../utils/constants/validations";

const jwt_secret = config.jwt_secret;

jest.mock("jsonwebtoken");

describe("authorizationMiddleware", () => {
  let mockRequest: Partial<Request>;
  let mockResponse: Partial<Response>;
  const nextFunction = jest.fn();

  beforeEach(() => {
    mockRequest = {
      headers: {},
      body: {},
    };
    mockResponse = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    };
  });

  it("should return error if there are no headers", async () => {
    authorizationMiddleware(
      mockRequest as Request,
      mockResponse as Response,
      nextFunction
    );

    expect(mockResponse.status).toHaveBeenCalledWith(401);
    expect(mockResponse.json).toHaveBeenCalledWith({ message: AUTH.NO_TOKEN });
    expect(nextFunction).not.toHaveBeenCalled();
  });

  it("should verify the token and call the next function if the token is provided and is valid", async () => {
    const mockToken = "abc123";
    const mockDecodedToken = {
      email: "testemail@gmail.com",
      iat: 1685545825,
      exp: 1685546125,
    };

    mockRequest.headers = {
      authorization: `Bearer ${mockToken}`,
    };

    (jwt.verify as jest.Mock).mockImplementationOnce(
      (token, secret, callback) => {
        callback(null, mockDecodedToken);
      }
    );

    authorizationMiddleware(
      mockRequest as Request,
      mockResponse as Response,
      nextFunction
    );

    expect(jwt.verify).toHaveBeenCalledWith(
      mockToken,
      jwt_secret,
      expect.any(Function)
    );
    expect(mockRequest.body.data).toEqual(mockDecodedToken);
    expect(nextFunction).toHaveBeenCalled();
    expect(mockResponse.status).not.toHaveBeenCalled();
    expect(mockResponse.json).not.toHaveBeenCalled();
  });
});
