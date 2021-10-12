import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('food_places')
export class FoodPlace {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({
    unique: true,
  })
  name: string;

  @Column({
    nullable: true,
  })
  website: string;
}
