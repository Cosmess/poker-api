import { Entity, Column, PrimaryGeneratedColumn, ManyToOne, JoinColumn, CreateDateColumn } from 'typeorm';
import { User } from './user.entity';
import { Table } from './table.entity';

@Entity('user_history')
export class UserHistory {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => User, (user) => user.id, { eager: true })
  @JoinColumn({ name: 'user_id' })
  user: User;

  @ManyToOne(() => Table, (table) => table.id, { eager: true })
  @JoinColumn({ name: 'table_id' })
  table: Table;

  @Column()
  isWinner: boolean;

  @CreateDateColumn()
  createdAt: Date;
}
