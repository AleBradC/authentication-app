import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { Container } from "typedi";

import AuthService from "../../../services/AuthService";
import UsersService from "../../../services/UsersService";
import CustomError from "../../../errorHandlers/ErrorHandler";
import { USER_VALIDATION, SUCCESS } from "../../../utils/constants/validations";
import config from "../../../../config";
import User from "../../../models/User";

const jwt_secret: string = config.jwt_secret as string;

jest.mock("bcrypt");
jest.mock("jsonwebtoken");

// variables
const userDetails = {
  user_name: "test",
  email: "testemail",
  password: "testpassword",
} as User;

const userLogin = {
  email: "testemail",
  password: "testpassword",
} as User;

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
    it("should register a new user and return the success message", async () => {
      const passwordHash = "hashedPassword";

      jest.spyOn(mockUsersService, "getUserByEmail").mockResolvedValue(null);
      jest.spyOn(mockUsersService, "getUserByUserName").mockResolvedValue(null);
      jest.spyOn(bcrypt, "genSalt").mockResolvedValue("salt" as never);
      jest.spyOn(bcrypt, "hash").mockResolvedValue(passwordHash as never);
      jest
        .spyOn(mockUsersService, "postUser")
        .mockResolvedValue(Promise.resolve({} as User));

      const result = await mockAuthService.register(userDetails);

      expect(mockUsersService.getUserByEmail).toHaveBeenCalledWith(
        userDetails.email
      );
      expect(mockUsersService.getUserByUserName).toHaveBeenCalledWith(
        userDetails.user_name
      );
      expect(bcrypt.genSalt).toHaveBeenCalled();
      expect(bcrypt.hash).toHaveBeenCalledWith(userDetails.password, "salt");
      expect(mockUsersService.postUser).toHaveBeenCalledWith({
        user_name: userDetails.user_name,
        email: userDetails.email,
        password: passwordHash,
      });
      expect(result).toEqual(SUCCESS.USER_CREATED);
    });

    it("should return USER_VALIDATION.EMAIL_USED if the email is already used", async () => {
      const existingUserByEmail = { email: userDetails.email } as User;

      jest
        .spyOn(mockUsersService, "getUserByEmail")
        .mockResolvedValue(existingUserByEmail);

      const result = await mockAuthService.register(userDetails);

      expect(mockUsersService.getUserByEmail).toHaveBeenCalledWith(
        userDetails.email
      );
      expect(result).toEqual(USER_VALIDATION.EMAIL_USED);
    });

    it("should return USER_VALIDATION.USER_NAME_USED if the username is already used", async () => {
      const existingUserByEmail = null;
      const existingUserByUserName = {
        user_name: userDetails.user_name,
      } as User;

      jest
        .spyOn(mockUsersService, "getUserByEmail")
        .mockResolvedValue(existingUserByEmail);
      jest
        .spyOn(mockUsersService, "getUserByUserName")
        .mockResolvedValue(existingUserByUserName);

      const result = await mockAuthService.register(userDetails);

      expect(mockUsersService.getUserByEmail).toHaveBeenCalledWith(
        userDetails.email
      );
      expect(mockUsersService.getUserByUserName).toHaveBeenCalledWith(
        userDetails.user_name
      );
      expect(result).toEqual(USER_VALIDATION.USER_NAME_USED);
    });

    it("should throw a CustomError if an error occurs during registration", async () => {
      jest
        .spyOn(mockUsersService, "getUserByEmail")
        .mockRejectedValue(new Error("Error"));

      await expect(mockAuthService.register(userDetails)).rejects.toThrow(
        CustomError
      );
    });
  });

  describe("login", () => {
    it("should return a JWT token if the login details are valid", async () => {
      const existingUserByEmail = {
        email: userLogin.email,
        password: "hashedPassword",
      } as User;
      const isValid = true;
      const accessToken = "token";

      jest
        .spyOn(mockUsersService, "getAllUsersDetails")
        .mockResolvedValue(existingUserByEmail);
      jest.spyOn(bcrypt, "compare").mockResolvedValue(isValid as never);
      jest.spyOn(jwt, "sign").mockReturnValue(accessToken as never);

      const result = await mockAuthService.login(userLogin);

      expect(mockUsersService.getAllUsersDetails).toHaveBeenCalledWith(
        userLogin.email
      );
      expect(bcrypt.compare).toHaveBeenCalledWith(
        userLogin.password,
        existingUserByEmail.password
      );
      expect(jwt.sign).toHaveBeenCalledWith(
        { email: userLogin.email },
        jwt_secret,
        {
          expiresIn: "5min",
        }
      );
      expect(result).toEqual(accessToken);
    });

    it("should return USER_VALIDATION.USER_NOT_FOUND if no user is found with the email", async () => {
      const existingUserByEmail = null;

      jest
        .spyOn(mockUsersService, "getAllUsersDetails")
        .mockResolvedValue(existingUserByEmail);

      const result = await mockAuthService.login(userLogin);

      expect(mockUsersService.getAllUsersDetails).toHaveBeenCalledWith(
        userLogin.email
      );
      expect(result).toEqual(USER_VALIDATION.USER_NOT_FOUND);
    });

    it("should return USER_VALIDATION.WRONG_PASSWARD_OR_EMAIL if the password is incorrect", async () => {
      const existingUserByEmail = {
        email: userLogin.email,
        password: "hashedPassword",
      } as User;
      const isValid = false;

      jest
        .spyOn(mockUsersService, "getAllUsersDetails")
        .mockResolvedValue(existingUserByEmail);
      jest.spyOn(bcrypt, "compare").mockResolvedValue(isValid as never);

      const result = await mockAuthService.login(userLogin);

      expect(mockUsersService.getAllUsersDetails).toHaveBeenCalledWith(
        userLogin.email
      );
      expect(bcrypt.compare).toHaveBeenCalledWith(
        userLogin.password,
        existingUserByEmail.password
      );
      expect(result).toEqual(USER_VALIDATION.WRONG_PASSWARD_OR_EMAIL);
    });

    it("should throw a CustomError if an error occurs during login", async () => {
      jest
        .spyOn(mockUsersService, "getAllUsersDetails")
        .mockRejectedValue(new Error("Error"));

      await expect(mockAuthService.login(userLogin)).rejects.toThrow(
        CustomError
      );
    });
  });
});
