import { Column, Entity, JoinColumn, ManyToOne, OneToMany, OneToOne, PrimaryColumn, PrimaryGeneratedColumn } from "typeorm";
import { Trigger } from "./Trigger.entity";

@Entity()
export class AvailableTrigger {
  @PrimaryColumn()
  id: string;

  @Column()
  name: string;

  @Column({ length: 2048 })
  image: string;
}