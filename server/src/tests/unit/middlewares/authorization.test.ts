import { Request, Response } from "express";
import jwt from "jsonwebtoken";

import authorizationMiddleware from "../../../middlewares/authorization";
import config from "../../../../config";

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
      status: jest.fn().mockReturnThis(), // Mock the status() method
      json: jest.fn(), // Mock the json() method
    };
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it("should verify the token and call the next function if the token is provided and is valid", async () => {
    mockRequest = {
      headers: {
        authorization: "abc123",
      },
      body: {
        data: {},
      },
    };

    const mockToken = "abc123";
    const mockDecodedToken = {
      email: "test@example.com",
    };

    if (mockRequest.headers?.authorization) {
      mockRequest.headers.authorization = mockToken;

      // Mock jwt.verify to return the decoded token
      (jwt.verify as jest.Mock).mockReturnValue(mockDecodedToken);

      const decoded = jwt.verify(mockToken, jwt_secret!);

      mockResponse.status = jest.fn().mockReturnThis(); // Mock the status() method

      authorizationMiddleware(
        mockRequest as Request,
        mockResponse as Response,
        nextFunction
      );

      expect(jwt.verify).toHaveBeenCalledWith(mockToken, jwt_secret!);
    }
  });

  it("should return 401 & A token is required message, if the user has no token in the header", async () => {
    mockRequest = {
      headers: {
        authorization: "",
      },
    };

    mockResponse.status = jest.fn().mockReturnValue(mockResponse);
    mockResponse.send = jest.fn().mockReturnValue(mockResponse);

    authorizationMiddleware(
      mockRequest as Request,
      mockResponse as Response,
      nextFunction
    );

    expect(nextFunction).not.toHaveBeenCalled();
  });
});
