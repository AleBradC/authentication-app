import { IUser } from "../IUser";

export interface TeamDTO {
  id: string;
  name: string;
  admin: IUser;
  members: IUser[];
}
