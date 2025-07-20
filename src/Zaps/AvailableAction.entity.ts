import { Column, Entity, JoinColumn, ManyToOne, OneToMany, OneToOne, PrimaryColumn, PrimaryGeneratedColumn } from "typeorm";
import { Action } from "./Action.entitty";

@Entity()
export class AvailableAction {
  @PrimaryColumn()
  id: string;

  @Column()
  name: string;

  @Column({ length: 2048 })
  image: string;
}