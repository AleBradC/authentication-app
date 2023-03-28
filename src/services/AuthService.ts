import { Service, Container } from "typedi";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

import { IAuthService, UserDetails } from "../interfaces/IAuthService";
import { PostgressRepository } from "../repositories/PostgressRepository";

@Service()
export class AuthService implements IAuthService {
  private repository = Container.get(PostgressRepository);

  register = async (details: UserDetails) => {
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

    return user;
  };
  // login = () => void;
  // logout = () => void;
}
