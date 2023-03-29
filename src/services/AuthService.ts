import { Service, Container } from "typedi";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import * as dotenv from "dotenv";

dotenv.config();

import {
  IAuthService,
  IUserDetails,
  IUserLogin,
} from "../interfaces/IAuthService";
import { PostgressRepository } from "../repositories/PostgressRepository";

@Service()
export class AuthService implements IAuthService {
  private repository = Container.get(PostgressRepository);

  register = async (details: IUserDetails) => {
    const existingUser = await this.repository.findOneByEmail(details.email);

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

    const accesToken = jwt.sign(
      { user: user.id },
      process.env.ACCESS_TOKEN_SECRET as string,
      { expiresIn: "2h" }
    );
    user.token = accesToken;

    await this.repository.saveUser(user);
    // const response = await this.repository.findOneById(user.id);

    return user;
  };

  login = async (details: IUserLogin) => {
    const user = await this.repository.findOneByEmail(details.email);

    if (!user) {
      return "Invalid credential";
    }

    await bcrypt.compare(details.password, user.password);

    const token = jwt.sign(
      { user: user.id },
      process.env.ACCESS_TOKEN_SECRET as string,
      { expiresIn: "2h" }
    );
    user.token = token;

    return user;
  };
  // logout = () => void;
}
