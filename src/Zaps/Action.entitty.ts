import { Column, Entity, JoinColumn, ManyToOne, OneToOne, PrimaryColumn, PrimaryGeneratedColumn } from "typeorm";
import { Zap } from "./Zap.entity";
import { AvailableAction } from "./AvailableAction.entity";

@Entity()
export class Action {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  zapId: string;

  @ManyToOne(() => Zap, zap => zap.actions, {
    onDelete: 'RESTRICT',
    onUpdate: 'CASCADE',
  })
  @JoinColumn({ name: 'zapId' })
  zap: Zap;

  @Column()
  actionId: string;

  @ManyToOne(() => AvailableAction, {
    onDelete: 'RESTRICT',
    onUpdate: 'CASCADE',
  })
  @JoinColumn({ name: 'actionId' })
  availableAction: AvailableAction;

  @Column()
  sortingOrder: number;

  @Column({ type: 'json', default: {} })
  metadata: Record<string, any>;
    type: any;
}