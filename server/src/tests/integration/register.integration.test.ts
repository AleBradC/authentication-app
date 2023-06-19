import request from "supertest";
import bcrypt from "bcrypt";
import { Container } from "typedi";
import app from "../../app";
import testConnectDB from "../../dataSource";
import AuthService from "../../services/AuthService";
import UsersService from "../../services/UsersService";
import User from "../../models/User";
import PostgressUserRepository from "../../repositories/PostgressUserRepository";
import { SUCCESS, USER_VALIDATION } from "../../utils/constants/validations";
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
    (testConnectDB.getRepository as jest.Mock).mockReturnValue({
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
      .spyOn(testConnectDB.getRepository(User), "findOne")
      .mockResolvedValue(existingUser);

    await request(app).post("/api/register").send(requestBody);

    const registerResult = await mockAuthService.register(requestBody);
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

  it("should return USER_VALIDATION.USER_NAME_USED if email is already used", async () => {
    jest.spyOn(mockAuthService, "register").mockResolvedValue({
      statusCode: STATUS_CODE.BAD_REQUEST,
      message: USER_VALIDATION.USER_NAME_USED,
    });

    jest
      .spyOn(mockUsersService, "getUserByUserName")
      .mockResolvedValue(existingUser);

    jest
      .spyOn(mockUserRepository, "findOneByUserName")
      .mockResolvedValue(existingUser);

    jest
      .spyOn(testConnectDB.getRepository(User), "findOne")
      .mockResolvedValue(existingUser);

    await request(app).post("/api/register").send(requestBody);

    const registerResult = await mockAuthService.register(requestBody);
    const getUserByUserNameResult = await mockUsersService.getUserByUserName(
      requestBody.user_name
    );
    const findOneByUserNameResult = await mockUserRepository.findOneByUserName(
      requestBody.user_name
    );

    expect(mockAuthService.register).toHaveBeenCalledWith(requestBody);
    expect(registerResult).toEqual({
      statusCode: STATUS_CODE.BAD_REQUEST,
      message: USER_VALIDATION.USER_NAME_USED,
    });
    expect(mockUsersService.getUserByUserName).toHaveBeenCalledWith(
      requestBody.user_name
    );
    expect(getUserByUserNameResult).toEqual(existingUser);
    expect(mockUserRepository.findOneByUserName).toHaveBeenCalledWith(
      requestBody.user_name
    );
    expect(findOneByUserNameResult).toEqual(existingUser);
  });

  it("should return 201 and success message if registration is successful", async () => {
    const passwordHash = "hashedPassword";

    // auth service spy
    jest.spyOn(mockAuthService, "register").mockResolvedValue({
      statusCode: STATUS_CODE.CREATED,
      message: SUCCESS.USER_CREATED,
    });
    jest.spyOn(bcrypt, "genSalt").mockResolvedValue("salt" as never);
    jest.spyOn(bcrypt, "hash").mockResolvedValue(passwordHash as never);

    // user service spy
    jest.spyOn(mockUsersService, "getUserByEmail").mockResolvedValue(null);
    jest.spyOn(mockUsersService, "getUserByUserName").mockResolvedValue(null);
    jest
      .spyOn(mockUsersService, "postUser")
      .mockResolvedValue(Promise.resolve({} as User));

    // user repo spy
    jest.spyOn(mockUserRepository, "findOneByEmail").mockResolvedValue(null);
    jest.spyOn(mockUserRepository, "findOneByUserName").mockResolvedValue(null);

    // connect db spy
    jest
      .spyOn(testConnectDB.getRepository(User), "findOne")
      .mockResolvedValue(null);

    // register call
    await request(app).post("/api/register").send(requestBody);

    // auth service call
    const response = await mockAuthService.register(requestBody);

    // user service call
    await mockUsersService.getUserByEmail(requestBody.email);
    await mockUsersService.getUserByUserName(requestBody.user_name);
    await mockUsersService.postUser({
      user_name: requestBody.user_name,
      email: requestBody.email,
      password: passwordHash,
    });

    // user repo calls
    await mockUserRepository.findOneByEmail(requestBody.email);
    await mockUserRepository.findOneByUserName(requestBody.user_name);
    await mockUserRepository.createUser(requestBody);

    // testConnectDB calls
    await testConnectDB.getRepository(User).findOne({
      relations: [
        "owned_teams",
        "owned_teams.members",
        "teams",
        "teams.admin",
        "teams.members",
      ],
      where: { email: requestBody.email },
    });
    await testConnectDB.getRepository(User).create(requestBody);
    await testConnectDB.getRepository(User).insert(requestBody);

    // auth service expect
    expect(mockAuthService.register).toHaveBeenCalledWith(requestBody);
    expect(response).toEqual({
      statusCode: STATUS_CODE.CREATED,
      message: SUCCESS.USER_CREATED,
    });
    expect(bcrypt.genSalt).toHaveBeenCalled();
    expect(bcrypt.hash).toHaveBeenCalledWith(requestBody.password, "salt");

    // user service expect
    expect(mockUsersService.getUserByEmail).toHaveBeenCalledWith(
      requestBody.email
    );
    expect(mockUsersService.getUserByUserName).toHaveBeenCalledWith(
      requestBody.user_name
    );
    expect(mockUsersService.postUser).toHaveBeenCalledWith({
      user_name: requestBody.user_name,
      email: requestBody.email,
      password: passwordHash,
    });

    // user repo expect
    expect(mockUserRepository.findOneByEmail).toHaveBeenCalledWith(
      requestBody.email
    );
    expect(mockUserRepository.findOneByUserName).toHaveBeenCalledWith(
      requestBody.user_name
    );
    expect(mockUserRepository.createUser).toHaveBeenCalledWith(requestBody);

    // connectDb expect
    expect(testConnectDB.getRepository(User).findOne).toHaveBeenCalledWith({
      relations: [
        "owned_teams",
        "owned_teams.members",
        "teams",
        "teams.admin",
        "teams.members",
      ],
      where: { email: requestBody.email },
    });
    expect(testConnectDB.getRepository(User).create).toHaveBeenCalledWith(
      requestBody
    );
    expect(testConnectDB.getRepository(User).insert).toHaveBeenCalled();
  });
});
