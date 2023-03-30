import { UserDTO } from "./DTOs/UserDTO";

export interface IUsersService {
  getAllUsers: () => Promise<UserDTO[]>;
  findUserById: (id: number) => Promise<UserDTO | null>;
}
