import IAdmin from "./IAdmin";
import IUser from "./IUser";

export default interface ITeam {
  name: string;
  admin: IAdmin;
  members?: IUser[];
}
