import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('faqs')
export class Faq {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  title: string;

  @Column()
  description: string;

  @Column()
  category: string;
}
