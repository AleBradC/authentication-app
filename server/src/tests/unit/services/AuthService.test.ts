import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { Container } from "typedi";

import User from "../../../models/User";
import AuthService from "../../../services/AuthService";
import UsersService from "../../../services/UsersService";
import CustomError from "../../../errorHandlers/ErrorHandler";
import { USER_VALIDATION, SUCCESS } from "../../../utils/constants/validations";
import config from "../../../../config";

const jwt_secret: string = config.jwt_secret as string;

jest.mock("bcrypt");
jest.mock("jsonwebtoken");

// variables
const mockUserDetails = {
  user_name: "test",
  email: "test@example.com",
  password: "testpassword",
} as User;

const passwordHash = "hashedPassword";

const mockUserLoginDetails = {
  email: "testemail",
  password: passwordHash,
} as User;

const mockUserResult = {
  id: "1",
  user_name: "test",
  email: "test@example.com",
  owned_teams: ["team"],
  teams: ["team"],
} as unknown as User;

const mockExistingUserByEmail = null;
const mockExistingUserByUserName = null;

describe("AuthService", () => {
  let mockAuthService: AuthService;
  let mockUsersService: UsersService;

  beforeEach(() => {
    mockUsersService = {
      getUserByEmail: jest.fn(),
      getUserByUserName: jest.fn(),
      postUser: jest.fn(),
      getAllUsersDetails: jest.fn(),
    } as unknown as UsersService;
    Container.set(UsersService, mockUsersService);

    mockAuthService = new AuthService(mockUsersService);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  describe("register", () => {
    it("should return USER_VALIDATION.EMAIL_USED if the email is already used", async () => {
      jest
        .spyOn(mockUsersService, "getUserByEmail")
        .mockResolvedValue(mockUserResult);

      const result = await mockAuthService.register(mockUserDetails);

      expect(mockUsersService.getUserByEmail).toHaveBeenCalledWith(
        mockUserDetails.email
      );
      expect(result).toEqual(USER_VALIDATION.EMAIL_USED);
    });

    it("should return USER_VALIDATION.USER_NAME_USED if the username is already used", async () => {
      jest
        .spyOn(mockUsersService, "getUserByEmail")
        .mockResolvedValue(mockExistingUserByEmail);
      jest
        .spyOn(mockUsersService, "getUserByUserName")
        .mockResolvedValue(mockUserResult);

      const result = await mockAuthService.register(mockUserDetails);

      expect(mockUsersService.getUserByEmail).toHaveBeenCalledWith(
        mockUserDetails.email
      );
      expect(mockUsersService.getUserByUserName).toHaveBeenCalledWith(
        mockUserDetails.user_name
      );
      expect(result).toEqual(USER_VALIDATION.USER_NAME_USED);
    });

    it("should register a new user and return the success message", async () => {
      jest
        .spyOn(mockUsersService, "getUserByEmail")
        .mockResolvedValue(mockExistingUserByEmail);
      jest
        .spyOn(mockUsersService, "getUserByUserName")
        .mockResolvedValue(mockExistingUserByUserName);
      jest.spyOn(bcrypt, "genSalt").mockResolvedValue("salt" as never);
      jest.spyOn(bcrypt, "hash").mockResolvedValue(passwordHash as never);
      jest
        .spyOn(mockUsersService, "postUser")
        .mockResolvedValue(Promise.resolve({} as User));

      const result = await mockAuthService.register(mockUserDetails);

      expect(mockUsersService.getUserByEmail).toHaveBeenCalledWith(
        mockUserDetails.email
      );
      expect(mockUsersService.getUserByUserName).toHaveBeenCalledWith(
        mockUserDetails.user_name
      );
      expect(bcrypt.genSalt).toHaveBeenCalled();
      expect(bcrypt.hash).toHaveBeenCalledWith(
        mockUserDetails.password,
        "salt"
      );
      expect(mockUsersService.postUser).toHaveBeenCalledWith({
        user_name: mockUserDetails.user_name,
        email: mockUserDetails.email,
        password: passwordHash,
      });
      expect(result).toEqual(SUCCESS.USER_CREATED);
    });

    it("should throw a CustomError if an error occurs during registration", async () => {
      jest
        .spyOn(mockUsersService, "getUserByEmail")
        .mockRejectedValue(new Error("Error"));

      await expect(mockAuthService.register(mockUserDetails)).rejects.toThrow(
        CustomError
      );
    });
  });

  describe("login", () => {
    it("should return USER_VALIDATION.USER_NOT_FOUND if no user is found with the email", async () => {
      jest
        .spyOn(mockUsersService, "getAllUsersDetails")
        .mockResolvedValue(mockExistingUserByEmail);

      const result = await mockAuthService.login(mockUserLoginDetails);

      expect(mockUsersService.getAllUsersDetails).toHaveBeenCalledWith(
        mockUserLoginDetails.email
      );
      expect(result).toEqual(USER_VALIDATION.USER_NOT_FOUND);
    });

    it("should return a JWT token if the login details are valid", async () => {
      const isValid = true;
      const accessToken = "token";

      jest
        .spyOn(mockUsersService, "getAllUsersDetails")
        .mockResolvedValue(mockUserDetails);
      jest.spyOn(bcrypt, "compare").mockResolvedValue(isValid as never);
      jest.spyOn(jwt, "sign").mockReturnValue(accessToken as never);

      const result = await mockAuthService.login(mockUserLoginDetails);

      expect(mockUsersService.getAllUsersDetails).toHaveBeenCalledWith(
        mockUserLoginDetails.email
      );
      expect(bcrypt.compare).toHaveBeenCalledWith(
        mockUserLoginDetails.password,
        mockUserDetails.password
      );
      expect(jwt.sign).toHaveBeenCalledWith(
        { email: mockUserLoginDetails.email },
        jwt_secret,
        {
          expiresIn: "5min",
        }
      );
      expect(result).toEqual(accessToken);
    });

    it("should return USER_VALIDATION.WRONG_PASSWARD_OR_EMAIL if the password is incorrect", async () => {
      const isValid = false;

      jest
        .spyOn(mockUsersService, "getAllUsersDetails")
        .mockResolvedValue(mockUserDetails);
      jest.spyOn(bcrypt, "compare").mockResolvedValue(isValid as never);

      const result = await mockAuthService.login(mockUserLoginDetails);

      expect(mockUsersService.getAllUsersDetails).toHaveBeenCalledWith(
        mockUserLoginDetails.email
      );
      expect(bcrypt.compare).toHaveBeenCalledWith(
        mockUserLoginDetails.password,
        mockUserDetails.password
      );
      expect(result).toEqual(USER_VALIDATION.WRONG_PASSWARD_OR_EMAIL);
    });

    it("should throw a CustomError if an error occurs during login", async () => {
      jest
        .spyOn(mockUsersService, "getAllUsersDetails")
        .mockRejectedValue(new Error("Error"));

      await expect(mockAuthService.login(mockUserLoginDetails)).rejects.toThrow(
        CustomError
      );
    });
  });
});
