import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  JoinColumn,
  ManyToMany,
  JoinTable,
  ManyToOne,
} from "typeorm";
import { User } from "./User";

@Entity("teams")
export class Team {
  @PrimaryGeneratedColumn()
  id: string;

  @Column()
  name: string;

  // many teams can have one admin
  // for in key
  @ManyToOne(() => User, (user) => user.owned_teams, {
    onDelete: "CASCADE",
  })
  @JoinColumn({
    name: "admin_id", // name of the primary key
  })
  admin: User;

  // many teams can have multiple users
  @ManyToMany(() => User, (user) => user.id, { cascade: true })
  @JoinTable({
    name: "members",
    joinColumn: {
      name: "team",
      referencedColumnName: "id",
    },
    inverseJoinColumn: {
      name: "user",
      referencedColumnName: "id",
    },
  })
  members: User[]; // -> tabel separat
}
