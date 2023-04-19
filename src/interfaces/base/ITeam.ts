import UserDTO from "../DTOs/UserDTO";
import IUser from "./IUser";

export default interface ITeam {
  name: string;
  admin: UserDTO;
}
