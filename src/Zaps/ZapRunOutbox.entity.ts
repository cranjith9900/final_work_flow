import { Column, Entity, JoinColumn, ManyToOne, OneToMany, OneToOne, PrimaryColumn, PrimaryGeneratedColumn } from "typeorm";
import { ZapRun } from "./ZapRun.entity";

@Entity()
export class ZapRunOutbox {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ unique: true })
  zapRunId: string;

  @OneToOne(() => ZapRun, zapRun => zapRun.outbox, {
    onDelete: 'RESTRICT',
    onUpdate: 'CASCADE',
  })
  @JoinColumn({ name: 'zapRunId' })
  zapRun: ZapRun;
}