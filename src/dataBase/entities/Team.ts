import { Entity, Column, PrimaryGeneratedColumn, BaseEntity } from "typeorm";

@Entity("teams")
export class Team {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  admin: string;

  @Column()
  members: string;
}
