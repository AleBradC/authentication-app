import { IUser } from "./IUser";

export interface ITeam {
  id: number;
  name: string;
  admin: IUser;
  members: IUser[];
}
