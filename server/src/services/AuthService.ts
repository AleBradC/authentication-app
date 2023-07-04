import { Service, Inject, Container } from "typedi";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import dbConfig from "../../config/index";

import IUser from "../interfaces/base/IUser";
import UsersService from "./UsersService";
import CustomError from "../errorHandlers/ErrorHandler";
import { IAuthService, IUserLogin } from "../interfaces/services/IAuthService";
import { SUCCESS, USER_VALIDATION } from "../utils/constants/validations";
import { STATUS_CODE } from "../utils/constants/statusCode";
import { IAuthResponse } from "../interfaces/services/IAuthResponse";

const jwt_secret = dbConfig.jwt_secret;

@Service()
export default class AuthService implements IAuthService {
  constructor(@Inject() private userService: UsersService) {}

  register = async (details: IUser): Promise<IAuthResponse | null> => {
    try {
      const { user_name, email, password } = details;

      const existingUserByEmail = await this.userService.getUserByEmail(email);
      if (existingUserByEmail) {
        return {
          statusCode: STATUS_CODE.BAD_REQUEST,
          message: USER_VALIDATION.EMAIL_USED,
        };
      }

      const existingUserByUserName = await this.userService.getUserByUserName(
        user_name
      );
      if (existingUserByUserName) {
        return {
          statusCode: STATUS_CODE.BAD_REQUEST,
          message: USER_VALIDATION.USER_NAME_USED,
        };
      }

      const salt = await bcrypt.genSalt();
      const passwordHash = await bcrypt.hash(password, salt);

      const response = await this.userService.postUser({
        user_name: user_name,
        email: email,
        password: passwordHash,
      });

      if (!response) {
        return {
          statusCode: STATUS_CODE.BAD_REQUEST,
          message: USER_VALIDATION.CANT_POST_USER,
        };
      }

      return {
        statusCode: STATUS_CODE.CREATED,
        message: SUCCESS.USER_CREATED,
      };
    } catch (error) {
      throw new CustomError(error.statusCode, error.message);
    }
  };

  login = async (
    details: IUserLogin
  ): Promise<IAuthResponse | string | null> => {
    try {
      const { email, password } = details;

      const existingUserByEmail = await this.userService.getAllUsersDetails(
        email
      );
      if (!existingUserByEmail) {
        return {
          statusCode: STATUS_CODE.BAD_REQUEST,
          message: USER_VALIDATION.USER_NOT_FOUND,
        };
      }

      const isValid = await bcrypt.compare(
        password,
        existingUserByEmail.password
      );
      if (!isValid) {
        return {
          statusCode: STATUS_CODE.BAD_REQUEST,
          message: USER_VALIDATION.WRONG_PASSWARD_OR_EMAIL,
        };
      }

      const payload = {
        email: email,
      };
      const accesToken = jwt.sign(payload, jwt_secret!, {
        expiresIn: "5min",
      });

      return accesToken;
    } catch (error) {
      throw new CustomError(error.statusCode, error.message);
    }
  };
}
