import UserDTO from "./UserDTO";
export default interface TeamDTO {
  id: string;
  name: string;
  admin: UserDTO;
  members: UserDTO[];
}
