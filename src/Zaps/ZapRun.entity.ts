import { Column, Entity, JoinColumn, ManyToOne, OneToMany, OneToOne, PrimaryColumn, PrimaryGeneratedColumn } from "typeorm";
import { Zap } from "./Zap.entity";
import { ZapRunOutbox } from "./ZapRunOutbox.entity";


@Entity()
export class ZapRun {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  zapId: string;

  @ManyToOne(() => Zap, zap => zap.zapRuns, {
    onDelete: 'RESTRICT',
    onUpdate: 'CASCADE',
  })
  @JoinColumn({ name: 'zapId' })
  zap: Zap;

  @Column({ type: 'json', default: {} })
  metadata: Record<string, any>;

  @OneToOne(() => ZapRunOutbox, outbox => outbox.zapRun)
  outbox: ZapRunOutbox;
}