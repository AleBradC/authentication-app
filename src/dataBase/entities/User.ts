import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  ManyToMany,
  OneToMany,
  Relation,
} from "typeorm";
import Team from "./Team";

@Entity("users")
export default class User {
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
  owned_teams: Relation<Team[]>;

  @ManyToMany(() => Team, (team) => team.members)
  teams: Relation<Team[]>;
}
