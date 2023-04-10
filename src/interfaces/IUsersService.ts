import { UserDTO } from "./DTOs/UserDTO";

export interface IUsersService {
  getAllUsers: () => any;
  getUserById: (id: string) => any;
}
