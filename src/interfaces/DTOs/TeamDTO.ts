import AdminDTO from "./AdminDTO";
import MemberDTO from "./MemberDTO";

export default interface TeamDTO {
  id: string;
  name: string;
  admin: AdminDTO;
  members: MemberDTO[];
}
