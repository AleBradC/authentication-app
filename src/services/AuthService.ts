import { Service, Container } from "typedi";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

import {
  IAuthService,
  IUserDetails,
  IUserLogin,
} from "../interfaces/IAuthService";
import { PostgressUserRepository } from "../repositories/PostgressUserRepository";
import config from "../../config";

const jwt_secret = config.jwt_secret;
@Service()
export class AuthService implements IAuthService {
  private repository = Container.get(PostgressUserRepository);

  register = async (details: IUserDetails) => {
    const existingUser = await this.repository.findOneUserByEmail(
      details.email
    );

    if (existingUser) {
      return "User already exists";
    }

    const salt = await bcrypt.genSalt();
    const passwordHash = await bcrypt.hash(details.password, salt);

    const user = await this.repository.createUser({
      first_name: details.firstName,
      last_name: details.lastName,
      email: details.email,
      password: passwordHash,
    });

    const accesToken = jwt.sign({ email: user.email }, jwt_secret!, {
      expiresIn: "2h",
    });

    return accesToken;
  };

  login = async (details: IUserLogin) => {
    const user = await this.repository.findOneUserByEmail(details.email);

    if (!user) {
      return "Invalid credential";
    }

    const isValid = await bcrypt.compare(details.password, user.password);

    if (isValid) {
      const accesToken = jwt.sign({ email: user.email }, jwt_secret!, {
        expiresIn: "2h",
      });

      return accesToken;
    }

    return "Error";
  };
  // logout = () => void;
}
