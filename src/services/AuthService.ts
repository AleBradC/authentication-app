import { Service, Container } from "typedi";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

import { IAuthService, IUserLogin } from "../interfaces/services/IAuthService";
import { UsersService } from "./UsersService";
import config from "../../config";
import IUser from "../interfaces/base/IUser";

const jwt_secret = config.jwt_secret;
@Service()
export class AuthService implements IAuthService {
  private userService = Container.get(UsersService);

  register = async (details: IUser) => {
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

  login = async (details: IUserLogin) => {
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
  // logout = () => void;
}
