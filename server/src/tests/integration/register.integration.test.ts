import request from "supertest";
import bcrypt from "bcrypt";
import { Container } from "typedi";
import app from "../../app";
import connectDB from "../../dataSource";
import AuthService from "../../services/AuthService";
import UsersService from "../../services/UsersService";
import User from "../../models/User";
import PostgressUserRepository from "../../repositories/PostgressUserRepository";
import { SUCCESS, USER_VALIDATION } from "../../utils/constants/validations";
import { STATUS_CODE } from "../../utils/constants/statusCode";
import UserDTO from "src/interfaces/DTOs/UserDTO";

jest.mock("bcrypt");
jest.mock("jsonwebtoken");
jest.mock("../../dataSource");

const requestBody = {
  user_name: "test_user",
  email: "test_email",
  password: "test_password",
};

const existingUser = {
  id: "id",
  user_name: "existing_username",
  email: "existing_email",
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
      save: jest.fn().mockReturnValue({}),
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

    mockUserRepository = new PostgressUserRepository();
    mockUsersService = new UsersService();
    mockAuthService = new AuthService(mockUsersService);

    Container.set(UsersService, mockUsersService);
    Container.set(AuthService, mockAuthService);
    Container.set(PostgressUserRepository, mockUserRepository);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it("should return 400 and error message in case inputs are empty", async () => {
    const response = await request(app)
      .post("/api/register")
      .send({})
      .expect(STATUS_CODE.BAD_REQUEST);

    expect(response.body.message).toEqual(USER_VALIDATION.EMPTY_INPUTS);
  });

  it("should return USER_VALIDATION.EMAIL_USED if email is already used", async () => {
    jest
      .spyOn(mockAuthService, "register")
      .mockResolvedValue(USER_VALIDATION.EMAIL_USED);

    jest
      .spyOn(mockUsersService, "getUserByEmail")
      .mockResolvedValue(existingUser);

    jest
      .spyOn(mockUserRepository, "findOneByEmail")
      .mockResolvedValue(existingUser);

    jest
      .spyOn(connectDB.getRepository(User), "findOne")
      .mockResolvedValue(existingUser);

    const result = await mockUserRepository.findOneByEmail(existingUser.email);
    const response = await request(app).post("/api/register").send(requestBody);

    expect(result).toEqual(existingUser);
    // expect(connectDB.getRepository(User).findOne).toHaveBeenCalledWith({
    //   relations: [
    //     "owned_teams",
    //     "owned_teams.members",
    //     "teams",
    //     "teams.admin",
    //     "teams.members",
    //   ],
    //   where: { email: existingUser.email },
    // });
    expect(response.body.message).toEqual(USER_VALIDATION.EMAIL_USED);
  });

  // it("should return USER_VALIDATION.USER_NAME_USED if user name is already used", async () => {
  //   const existingUserByUserName = { user_name: reqBody.user_name } as User;

  //   jest
  //     .spyOn(mockAuthService, "register")
  //     .mockResolvedValue(USER_VALIDATION.USER_NAME_USED);

  //   jest.spyOn(mockUsersService, "getUserByEmail").mockResolvedValue(null);

  //   jest
  //     .spyOn(mockUsersService, "getUserByUserName")
  //     .mockResolvedValue(existingUserByUserName);

  //   const response = await request(app).post("/api/register").send(reqBody);

  //   expect(response.body.message).toEqual(USER_VALIDATION.USER_NAME_USED);
  // });

  // it("should return 201 if registration is successful and success message", async () => {
  //   const passwordHash = "hashedPassword";

  //   jest.spyOn(mockUsersService, "getUserByEmail").mockResolvedValue(null);
  //   jest.spyOn(mockUsersService, "getUserByUserName").mockResolvedValue(null);
  //   jest.spyOn(bcrypt, "genSalt").mockResolvedValue("salt" as never);
  //   jest.spyOn(bcrypt, "hash").mockResolvedValue(passwordHash as never);

  //   jest
  //     .spyOn(mockUsersService, "postUser")
  //     .mockResolvedValue(Promise.resolve({} as User));

  //   await mockAuthService.register(reqBody);

  //   const response = await request(app)
  //     .post("/api/register")
  //     .send(reqBody)
  //     .expect(STATUS_CODE.CREATED);

  //   expect(response.body.message).toEqual(SUCCESS.USER_CREATED);
  // });
});
