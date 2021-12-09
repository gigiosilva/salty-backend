import {
  Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn,
} from 'typeorm';

import { FoodPlace } from '../food-places/food-place.entity';

import { WeekAvailability } from './week-availability.enum';

@Entity('user_addresses')
export class UserAddress {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({
    name: 'user_id',
    unique: true,
  })
  userId: string;

  @ManyToOne(() => FoodPlace, foodPlace => foodPlace.id, { nullable: true, eager: true })
  @JoinColumn([
    { name: 'food_place_id', referencedColumnName: 'id' },
  ])
  foodPlace: FoodPlace;

  @Column({
    nullable: true,
  })
  name: string;

  @Column({
    nullable: true,
  })
  street: string;

  @Column({
    nullable: true,
  })
  district: string;

  @Column({
    nullable: true,
  })
  city: string;

  @Column({
    nullable: true,
  })
  state: string;

  @Column({
    nullable: true,
  })
  country: string;

  @Column({
    name: 'zip_code',
    nullable: true,
  })
  zipCode: string;

  @Column({
    nullable: true,
  })
  complement: string;

  @Column({
    name: 'long_address',
    nullable: true,
  })
  longAddress: string;

  @Column({
    type: 'enum',
    enum: WeekAvailability,
    name: 'week_availability',
    array: true,
    nullable: true,
    default: [],
  })
  weekAvailability: WeekAvailability[];

  @Column({
    nullable: true,
  })
  latitude: string;

  @Column({
    nullable: true,
  })
  longitude: string;
}
