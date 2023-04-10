import { IUser } from "./IUser";

export interface ITeam {
  name: string;
  members: IUser[];
  admin?: IUser;
}
