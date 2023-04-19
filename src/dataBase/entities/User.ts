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
  user_name: string;

  @Column()
  email: string;

  @Column()
  password: string;

  // one user (admin) -> multiple owned teams
  @OneToMany(() => Team, (team) => team.admin)
  owned_teams: Team[]; // -> nu o sa apara in tabel

  @ManyToMany(() => Team, { cascade: true })
  teams: Team[]; // ->  tabel separat
}
