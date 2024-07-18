import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity({ name: 'songs' })
export class Song {
  @PrimaryGeneratedColumn({ type: 'bigint' })
  id: number;

  @Column()
  name: string;

  @Column()
  band: string;

  @Column()
  year: number;
}
