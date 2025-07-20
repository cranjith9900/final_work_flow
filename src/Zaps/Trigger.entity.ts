import { Column, Entity, JoinColumn, ManyToOne, OneToOne, PrimaryColumn, PrimaryGeneratedColumn } from "typeorm";
import { Zap } from "./Zap.entity";
import { AvailableTrigger } from "./AvailableTrigger.entity";

@Entity()
export class Trigger {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  triggerId: string;

  @Column({ unique: true }) // Unique constraint on zapId
  zapId: string;

  @OneToOne(() => Zap, zap => zap.trigger, {
    onDelete: 'RESTRICT',
    onUpdate: 'CASCADE',
  })
  @JoinColumn({ name: 'zapId' })
  zap: Zap;

  @ManyToOne(() => AvailableTrigger, {
    onDelete: 'RESTRICT',
    onUpdate: 'CASCADE',
  })
  @JoinColumn({ name: 'triggerId' })
  availableTrigger: AvailableTrigger;

  @Column({ type: 'json', default: {} })
  metadata: Record<string, any>;
}