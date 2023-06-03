import request from "supertest";
import { Container } from "typedi";
import app from "../../app";
import AuthService from "../../services/AuthService";
import UsersService from "../../services/UsersService";
import { SUCCESS, USER_VALIDATION } from "../../utils/constants/validations";
import { STATUS_CODE } from "../../utils/constants/statusCode";
import UserDTO from "src/interfaces/DTOs/UserDTO";

const reqBody = {
  user_name: "test_user",
  email: "test_email",
  password: "test_password",
};

describe("Registration Functionality", () => {
  let mockAuthService: AuthService;
  let mockUsersService: UsersService;

  beforeEach(() => {
    mockUsersService = {
      postUser: jest.fn(),
      getUserByEmail: jest.fn(),
      getUserByUserName: jest.fn(),
    } as unknown as UsersService;
    Container.set(UsersService, mockUsersService);

    mockAuthService = new AuthService(mockUsersService);
    mockUsersService = new UsersService();

    Container.set(AuthService, mockAuthService);
    Container.set(UsersService, mockUsersService);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it("should return 400 if any required field is missing and return a error message", async () => {
    const response = await request(app)
      .post("/api/register")
      .send({})
      .expect(STATUS_CODE.BAD_REQUEST);

    expect(response.body.message).toEqual(USER_VALIDATION.EMPTY_INPUTS);
  });

  it("should return 400 if email is already used", async () => {
    const existingEmail = {
      email: reqBody.email,
    } as unknown as UserDTO;

    const response = await request(app)
      .post("/api/register")
      .send(reqBody)
      .expect(STATUS_CODE.BAD_REQUEST);

    jest
      .spyOn(mockUsersService, "getUserByEmail")
      .mockResolvedValue(existingEmail);

    expect(response.body.message).toEqual(USER_VALIDATION.EMAIL_USED);
  });

  // it("should return 400 if username is already used", async () => {
  //   jest.spyOn(usersService, "getUserByEmail").mockResolvedValue(null);
  //   jest
  //     .spyOn(usersService, "getUserByUserName")
  //     .mockResolvedValue({ user_name: "existing_user" });

  //   const response = await request(app)
  //     .post("/api/register")
  //     .send({
  //       user_name: "existing_user",
  //       email: "test_email",
  //       password: "test_password",
  //     })
  //     .expect(STATUS_CODE.BAD_REQUEST);

  //   expect(response.body.message).toEqual(USER_VALIDATION.USER_NAME_USED);
  // });

  it("should return 201 if registration is successful and success message", async () => {
    jest.spyOn(mockUsersService, "getUserByEmail").mockResolvedValue(null);
    jest.spyOn(mockUsersService, "getUserByUserName").mockResolvedValue(null);
    // jest.spyOn(usersService, "postUser").mockResolvedValue(undefined);

    const response = await request(app)
      .post("/api/register")
      .send(reqBody)
      .expect(STATUS_CODE.CREATED);

    expect(response.body.message).toEqual(SUCCESS.USER_CREATED);
  });
});
