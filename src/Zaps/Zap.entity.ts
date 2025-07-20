import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  JoinColumn,
  ManyToOne,
  OneToMany,
  OneToOne,
  PrimaryColumn,
} from 'typeorm';
import { User } from '../user/user.entity';
import { Action } from './Action.entitty';
import { Trigger } from './Trigger.entity';
import { ZapRun } from './ZapRun.entity';

@Entity()
export class Zap {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  userId: number;

  @ManyToOne(() => User, user => user.zaps, {
    onDelete: 'RESTRICT',
    onUpdate: 'CASCADE',
  })
  @JoinColumn({ name: 'userId' })
  user: User;

  @Column({ nullable: true })
  triggerId: string;

  @OneToOne(() => Trigger, trigger => trigger.zap)
  trigger: Trigger;

  @OneToMany(() => Action, action => action.zap)
  actions: Action[];

  @OneToMany(() => ZapRun, zapRun => zapRun.zap)
  zapRuns: ZapRun[];
}