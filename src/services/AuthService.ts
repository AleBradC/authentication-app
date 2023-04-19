import { Service, Container } from "typedi";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import config from "../../config";

import IUser from "../interfaces/base/IUser";
import UsersService from "./UsersService";
import { IAuthService, IUserLogin } from "../interfaces/services/IAuthService";

const jwt_secret = config.jwt_secret;
@Service()
export class AuthService implements IAuthService {
  private userService;

  constructor() {
    this.userService = Container.get(UsersService);
  }

  register = async (details: IUser): Promise<string | null> => {
    const existingUser = await this.userService.getUserByEmail(details.email);

    if (existingUser) {
      return null;
    }

    const salt = await bcrypt.genSalt();
    const passwordHash = await bcrypt.hash(details.password, salt);

    const user = await this.userService.postUser({
      user_name: details.user_name,
      email: details.email,
      password: passwordHash,
    });

    const accesToken = jwt.sign({ email: user.email }, jwt_secret!, {
      expiresIn: "2h",
    });

    return accesToken;
  };

  login = async (details: IUserLogin): Promise<string | null> => {
    const existingUser = await this.userService.getAllUsersDetails(
      details.email
    );

    if (!existingUser) {
      return null;
    }

    const isValid = await bcrypt.compare(
      details.password,
      existingUser.password
    );

    if (isValid) {
      const accesToken = jwt.sign({ email: existingUser.email }, jwt_secret!, {
        expiresIn: "2h",
      });

      return accesToken;
    }

    return null;
  };
}
