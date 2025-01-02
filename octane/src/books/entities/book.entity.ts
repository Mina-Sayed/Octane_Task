import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  OneToMany,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';
import { ReadingInterval } from '../../reading/entities/reading-interval.entity';

@Entity('books')
export class Book {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  name: string;

  @Column()
  numOfPages: number;

  @OneToMany(() => ReadingInterval, (interval) => interval.book)
  readingIntervals: ReadingInterval[];

  @Column({ type: 'int', default: 0 })
  numOfReadPages: number;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
