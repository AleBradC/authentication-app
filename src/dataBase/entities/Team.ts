import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  JoinColumn,
  ManyToMany,
  JoinTable,
  ManyToOne,
  Relation,
} from "typeorm";
import User from "./User";

@Entity("teams")
export default class Team {
  @PrimaryGeneratedColumn()
  id: string;

  @Column()
  name: string;

  // for in key
  @ManyToOne(() => User, (user) => user.owned_teams)
  @JoinColumn({
    name: "admin", // name of the primary key
  })
  admin: Relation<User>;

  @ManyToMany(() => User, (user) => user.teams)
  @JoinTable({
    name: "members",
  })
  members: Relation<User[]>;
}
