import { IUser } from "../IUser";

export interface TeamDTO {
  name: string;
  admin: IUser;
  members: IUser[];
}
