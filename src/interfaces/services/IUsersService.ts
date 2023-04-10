import { UserDTO } from "../DTOs/UserDTO";

export interface IUsersService {
  getAllUsers: () => any;
  getUser: (id: string) => any;
}
