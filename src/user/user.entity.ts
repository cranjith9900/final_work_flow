import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { Zap } from '../Zaps/Zap.entity';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  email: string;

  @Column()
  password: string;

  @OneToMany(() => Zap, (zap) => zap.user)
  zaps: Zap[];
}
