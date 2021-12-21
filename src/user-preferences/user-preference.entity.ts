import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('user_preferences')
export class UserPreference {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({
    name: 'user_id',
    unique: true,
  })
  userId: string;

  @Column({
    type: 'varchar',
    array: true,
    default: [],
  })
  preferences: string[];

  @Column({
    nullable: true,
  })
  comments: string;

  @Column({
    name: 'is_delivery',
    default: true,
  })
  isDelivery: boolean;
}
