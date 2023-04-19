import IUser from "../base/IUser";
export default interface TeamDTO {
  id: string;
  name: string;
  admin: IUser;
  members: IUser[];
}
