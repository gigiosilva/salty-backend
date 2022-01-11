import {
  Column, CreateDateColumn, Entity, PrimaryGeneratedColumn,
} from 'typeorm';

@Entity('rounds')
export class Round {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({
    name: 'created_by',
  })
  createdBy: string; // UserId

  @Column()
  name: string;

  @Column('timestamptz', {
    name: 'start_date',
  })
  startDate: Date;

  @Column('timestamptz', {
    name: 'end_date',
  })
  endDate: Date;

  @Column({
    nullable: true,
  })
  comments: string;

  @Column({
    default: false,
    name: 'is_active',
  })
  isActive: boolean;

  @CreateDateColumn({
    type: 'timestamptz',
    name: 'created_at',
  })
  createdAt: Date;
}
