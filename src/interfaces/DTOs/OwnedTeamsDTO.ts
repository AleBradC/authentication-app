import UserDTO from "./UserDTO";

export default interface OwnedTeamsDTO {
  id: string;
  name: string;
  members: UserDTO[]; // -> to do
}
