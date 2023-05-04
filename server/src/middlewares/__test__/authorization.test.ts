import { Request, Response, NextFunction } from "express";
import authorization from "../../middlewares/authorization";

describe("authorization token", () => {
  let mockRequest: Partial<Request>;
  let mockResponse: Partial<Response>;
  let nextFunction: NextFunction = jest.fn();

  beforeEach(() => {
    mockRequest = {
      headers: {
        Authorization: "sdsads",
      },
      body: {
        data: {},
      },
    };
    mockResponse = {
      status: jest.fn(),
      send: jest.fn(),
    };
  });

  it("should return 401 if the user has no token in the header", async () => {
    mockRequest = {
      headers: {
        Authorization: "",
      },
    };

    authorization(
      mockRequest as Request,
      mockResponse as Response,
      nextFunction
    );

    expect(mockResponse.status).toBeCalledWith(401);
  });
});
