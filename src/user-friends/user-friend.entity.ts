import {
  Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn, Unique,
} from 'typeorm';

import { Round } from './../rounds/round.entity';

@Entity('user_friends')
@Unique(['userId', 'friendId', 'round'])
export class UserFriend {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({
    name: 'user_id',
  })
  userId: string;

  @Column({
    name: 'friend_id',
  })
  friendId: string;

  @ManyToOne(() => Round, round => round.id, { nullable: true, eager: true })
  @JoinColumn([
    { name: 'round_id', referencedColumnName: 'id' },
  ])
  round: Round;

  @Column({
    type: 'varchar',
    name: 'gift_photo',
    nullable: true,
  })
  giftPhoto: string;

  @Column({
    type: 'varchar',
    name: 'gift_description',
    nullable: true,
  })
  giftDescription: string;

  @Column({
    type: 'timestamptz',
    name: 'gift_date',
    nullable: true,
  })
  giftDate: Date;

  @Column({
    name: 'has_gift',
    default: false,
    nullable: true,
  })
  hasGift: boolean;

  @CreateDateColumn({
    type: 'timestamptz',
    name: 'created_at',
  })
  createdAt: Date;
}
