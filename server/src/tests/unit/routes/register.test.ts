import request from "supertest";
import app from "../../../app";
import { Container } from "typedi";
import UsersService from "../../../services/UsersService";
import AuthService from "../../../services/AuthService";
import { SUCCESS, USER_VALIDATION } from "../../../utils/constants/validations";
import { STATUS_CODE } from "../../../utils/constants/statusCode";

describe("registerRoute", () => {
  let mockAuthService: AuthService;
  let mockUsersService: UsersService;

  beforeEach(() => {
    mockUsersService = {
      postUser: jest.fn(),
      getUserByEmail: jest.fn(),
      getUserByUserName: jest.fn(),
      getUserById: jest.fn(),
      getAllUsersDetails: jest.fn(),
      getAllUsers: jest.fn(),
    } as unknown as UsersService;

    Container.set(UsersService, mockUsersService);

    mockAuthService = new AuthService(mockUsersService);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it("should return 400 and error message in case email (or any other field) is missing", async () => {
    const reqBody = {
      user_name: "test",
      password: "testpassword",
    };

    const response = await request(app)
      .post("/api/register")
      .send(reqBody)
      .expect(STATUS_CODE.BAD_REQUEST);

    expect(response.body.message).toEqual(USER_VALIDATION.EMPTY_INPUTS);
  });

  it("should return 201 and call register function from AuthService", async () => {
    const reqBody = {
      user_name: "test",
      email: "testemail",
      password: "testpassword",
    };

    jest
      .spyOn(mockAuthService, "register")
      .mockResolvedValue(SUCCESS.USER_CREATED);

    const response = await request(app)
      .post("/api/register")
      .send(reqBody)
      .expect(STATUS_CODE.CREATED);

    expect(response.body.message).toEqual(SUCCESS.USER_CREATED);
  });
});
