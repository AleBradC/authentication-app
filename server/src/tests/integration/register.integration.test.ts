import request from "supertest";
import bcrypt from "bcrypt";
import { Container } from "typedi";
import app from "../../app";
import connectDB from "../../dataSource";
import AuthService, { RegisterResponse } from "../../services/AuthService";
import UsersService from "../../services/UsersService";
import User from "../../models/User";
import PostgressUserRepository from "../../repositories/PostgressUserRepository";
import { USER_VALIDATION } from "../../utils/constants/validations";
import { STATUS_CODE } from "../../utils/constants/statusCode";

jest.mock("bcrypt");
jest.mock("jsonwebtoken");
jest.mock("../../dataSource");

const requestBody = {
  user_name: "test_user",
  email: "test@example.com",
  password: "test_password",
};

const existingUser = {
  id: "1",
  user_name: "test_user",
  email: "test@example.com",
  owned_teams: ["ownedTeams"],
  teams: ["teams"],
} as unknown as User;

describe("Registration Functionality", () => {
  let mockAuthService: AuthService;
  let mockUsersService: UsersService;
  let mockUserRepository: PostgressUserRepository;

  beforeEach(() => {
    // mock DB methods
    (connectDB.getRepository as jest.Mock).mockReturnValue({
      create: jest.fn().mockReturnValue({}),
      insert: jest.fn().mockReturnValue({}),
      findOne: jest.fn().mockReturnValue({}),
      find: jest.fn().mockReturnValue([]),
    });

    mockUserRepository = {
      createUser: jest.fn(),
      findAllUsers: jest.fn(),
      findOneById: jest.fn(),
      findOneByEmail: jest.fn(),
      findOneByUserName: jest.fn(),
      findAllUserDetails: jest.fn(),
    } as unknown as PostgressUserRepository;

    mockUsersService = {
      postUser: jest.fn(),
      getUserByEmail: jest.fn(),
      getUserByUserName: jest.fn(),
      getUserById: jest.fn(),
      getAllUsersDetails: jest.fn(),
      getAllUsers: jest.fn(),
    } as unknown as UsersService;

    Container.set(UsersService, mockUsersService);
    Container.set(PostgressUserRepository, mockUserRepository);

    mockAuthService = new AuthService(mockUsersService);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it("should return 400 and error message in case inputs are empty", async () => {
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

  it("should return USER_VALIDATION.EMAIL_USED if email is already used", async () => {
    jest.spyOn(mockAuthService, "register").mockResolvedValue({
      statusCode: STATUS_CODE.BAD_REQUEST,
      message: USER_VALIDATION.EMAIL_USED,
    });

    jest
      .spyOn(mockUsersService, "getUserByEmail")
      .mockResolvedValue(existingUser);

    jest
      .spyOn(mockUserRepository, "findOneByEmail")
      .mockResolvedValue(existingUser);

    jest
      .spyOn(connectDB.getRepository(User), "findOne")
      .mockResolvedValue(existingUser);

    await request(app).post("/api/register").send(requestBody);

    const registerResult: RegisterResponse = (await mockAuthService.register(
      requestBody
    )) as RegisterResponse;
    const getUserByEmailResult = await mockUsersService.getUserByEmail(
      requestBody.email
    );
    const findOneByEmailResult = await mockUserRepository.findOneByEmail(
      requestBody.email
    );

    expect(mockAuthService.register).toHaveBeenCalledWith(requestBody);
    expect(registerResult).toEqual({
      statusCode: STATUS_CODE.BAD_REQUEST,
      message: USER_VALIDATION.EMAIL_USED,
    });
    expect(mockUsersService.getUserByEmail).toHaveBeenCalledWith(
      requestBody.email
    );
    expect(getUserByEmailResult).toEqual(existingUser);
    expect(mockUserRepository.findOneByEmail).toHaveBeenCalledWith(
      requestBody.email
    );
    expect(findOneByEmailResult).toEqual(existingUser);
  });
});
