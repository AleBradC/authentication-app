import { Service, Container } from "typedi";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import config from "../../config";

import IUser from "../interfaces/base/IUser";
import UsersService from "./UsersService";
import { IAuthService, IUserLogin } from "../interfaces/services/IAuthService";
import {
  GENERAL_VALIDATION,
  USER_VALIDATION,
} from "../utils/constants/validations";

const jwt_secret = config.jwt_secret;
@Service()
export class AuthService implements IAuthService {
  private userService;

  constructor() {
    this.userService = Container.get(UsersService);
  }

  register = async (details: IUser): Promise<string | null> => {
    const { user_name, email, password } = details;

    if (!user_name || !email || !password) {
      return USER_VALIDATION.REQUIRED_INPUTS;
    }

    const existingUserByEmail = await this.userService.getUserByEmail(email);
    if (existingUserByEmail?.email === email) {
      return USER_VALIDATION.EMAIL_USED;
    }

    const existingUserByUserName = await this.userService.getUserByUserName(
      user_name
    );
    if (
      existingUserByUserName?.user_name.toLowerCase() ===
      user_name.toLowerCase()
    ) {
      return USER_VALIDATION.USER_NAME_USED;
    }

    const salt = await bcrypt.genSalt();
    const passwordHash = await bcrypt.hash(password, salt);

    await this.userService.postUser({
      user_name: user_name,
      email: email,
      password: passwordHash,
    });

    const accesToken = jwt.sign({ email: email }, jwt_secret!, {
      expiresIn: "2h",
    });
    return accesToken;
  };

  login = async (details: IUserLogin): Promise<string | null> => {
    const { email, password } = details;

    if (!(email && password)) {
      return USER_VALIDATION.REQUIRED_INPUTS;
    }

    const existingUserByEmail = await this.userService.getAllUsersDetails(
      email
    );
    if (!existingUserByEmail) {
      return GENERAL_VALIDATION.USER_NOT_FOUND;
    }

    const isValid = await bcrypt.compare(
      password,
      existingUserByEmail.password
    );
    if (!isValid) {
      return USER_VALIDATION.WRONG_PASSWARD_OR_EMAIL;
    }

    const accesToken = jwt.sign({ email: email }, jwt_secret!, {
      expiresIn: "2h",
    });
    return accesToken;
  };
}
