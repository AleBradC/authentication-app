import { Entity, Column, PrimaryGeneratedColumn } from "typeorm";
import { Team } from "./Team";

type IUserRole = "normal" | "member" | "admin";

@Entity("users")
export class User {
  @PrimaryGeneratedColumn()
  id: number;

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

  @Column({
    default: [],
  })
  teams: Team[];
}
