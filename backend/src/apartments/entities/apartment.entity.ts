import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity()
export class Apartment {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  unitNumber: string;

  @Column()
  project: string;

  @Column()
  price: number;

  @Column()
  location: string;

  @Column({ nullable: true })
  imageUrl: string;
}
