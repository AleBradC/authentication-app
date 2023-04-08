import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  JoinColumn,
  OneToOne,
  ManyToMany,
  JoinTable,
} from "typeorm";
import { User } from "./User";

@Entity("teams")
export class Team {
  @PrimaryGeneratedColumn()
  id: string;

  @Column()
  name: string;

  @ManyToMany(() => User)
  @JoinTable()
  members: User[];

  // one team -> only one admin
  @OneToOne(() => User)
  @JoinColumn({
    name: "admin_id",
  })
  admin: User;
}
