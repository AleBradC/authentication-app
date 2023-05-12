import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";

import authorization from "../../../middlewares/authorization";
import config from "../../../../config";
import { GENERAL_VALIDATION } from "../../../utils/constants/validations";

const jwt_secret = config.jwt_secret;

jest.mock("jsonwebtoken");

describe("authorization", () => {
  let mockRequest: Partial<Request>;
  let mockResponse: Partial<Response>;
  const nextFunction = jest.fn();

  beforeEach(() => {
    mockRequest = {
      headers: {},
      body: {},
    };
    mockResponse = {
      status: jest.fn(),
      send: jest.fn(),
    };
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it("should verify the token and call next function if the token is provided and is valid", async () => {
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

      authorization(
        mockRequest as Request,
        mockResponse as Response,
        nextFunction
      );

      expect(jwt.verify).toHaveBeenCalledWith(mockToken, jwt_secret!);
      expect(mockRequest.body.data).toEqual(decoded);
      expect(nextFunction).toHaveBeenCalled();
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

    authorization(
      mockRequest as Request,
      mockResponse as Response,
      nextFunction
    );

    expect(mockResponse.status).toBeCalledWith(401);
    expect(mockResponse.send).toBeCalledWith(GENERAL_VALIDATION.NO_TOKEN);
    expect(nextFunction).not.toHaveBeenCalled();
  });
});
