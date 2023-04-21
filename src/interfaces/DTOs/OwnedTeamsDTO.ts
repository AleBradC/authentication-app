import MemberDTO from "./MemberDTO";

export default interface OwnedTeamsDTO {
  id: string;
  name: string;
  members: MemberDTO[];
}
