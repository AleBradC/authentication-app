import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  JoinColumn,
  ManyToMany,
  ManyToOne,
  JoinTable,
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

  @ManyToMany(() => Team)
  @JoinTable()
  teams: User[];

  // one user (admin) -> multiple owned teams
  @ManyToOne(() => Team, (team) => team.admin)
  @JoinColumn({
    name: "owned_teams",
  })
  owned_teams: Team[];
}
