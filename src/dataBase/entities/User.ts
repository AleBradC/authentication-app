import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  ManyToMany,
  OneToMany,
} from "typeorm";
import { Team } from "./Team";

type IUserRole = "normal" | "member" | "admin";

@Entity("users")
export class User {
  @PrimaryGeneratedColumn()
  id: string;

  @Column()
  first_name: string;

  @Column()
  last_name: string;

  @Column()
  email: string;

  @Column()
  password: string;

  @Column({
    default: "normal",
  })
  role: IUserRole;

  // one user (admin) -> multiple owned teams
  @OneToMany(() => Team, (team) => team.admin)
  owned_teams: Team[]; // -> nu o sa apara in tabel

  @ManyToMany(() => Team, { cascade: true })
  teams: Team[]; // ->  tabel separat
}
