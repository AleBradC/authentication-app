import request from "supertest";
import app from "../../../app";
import { Container } from "typedi";
import UsersService from "../../../services/UsersService";
import AuthService from "../../../services/AuthService";
import { SUCCESS, USER_VALIDATION } from "../../../utils/constants/validations";
import { STATUS_CODE } from "../../../utils/constants/statusCode";
import User from "../../../models/User";

const mockUserResult = {
  id: "1",
  user_name: "test",
  email: "test@example.com",
  owned_teams: ["team"],
  teams: ["team"],
} as unknown as User;

const requestBody = {
  user_name: "test",
  email: "test@example.com",
  password: "testpassword",
};

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

  it("should return 400 and error message if any required field is missing", async () => {
    const requestBodyNoEmail = {
      user_name: "test",
      password: "testpassword",
    };

    const response = await request(app)
      .post("/api/register")
      .send(requestBodyNoEmail)
      .expect(STATUS_CODE.BAD_REQUEST);

    expect(response.body.message).toEqual(USER_VALIDATION.EMPTY_INPUTS);
  });

  it("should return 201 and success message if registration is successful", async () => {
    jest.spyOn(mockAuthService, "register").mockResolvedValue({
      statusCode: STATUS_CODE.CREATED,
      message: SUCCESS.USER_CREATED,
    });

    jest.spyOn(mockUsersService, "getUserByEmail").mockResolvedValue(null);
    jest.spyOn(mockUsersService, "getUserByUserName").mockResolvedValue(null);

    const response = await mockAuthService.register(requestBody);

    await request(app).post("/api/register").send(requestBody);

    expect(mockAuthService.register).toHaveBeenCalledWith(requestBody);
    expect(response).toEqual({
      statusCode: STATUS_CODE.CREATED,
      message: SUCCESS.USER_CREATED,
    });
  });
});
