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
    const { user_name, email, password } = details;

    const existingUser = await this.userService.getUserByEmail(email);
    if (existingUser) {
      return "This email is already used";
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

    const existingUser = await this.userService.getAllUsersDetails(email);
    if (!existingUser) {
      return "This user doesn't exist";
    }

    const isValid = await bcrypt.compare(password, existingUser.password);
    if (isValid) {
      const accesToken = jwt.sign({ email: email }, jwt_secret!, {
        expiresIn: "2h",
      });

      return accesToken;
    }
    return "Email or passward is incorrect";
  };
}
