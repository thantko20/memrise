import { Collection } from '@server/collections/entities/collection.entity';
import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity({ name: 'cards' })
export class Card {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ name: 'front', type: 'text' })
  front: string;

  @Column({ type: 'text' })
  back: string;

  @Column({ type: 'text', nullable: true })
  description?: string;

  @ManyToOne(() => Collection, (collection) => collection.id)
  @JoinColumn({ name: 'collection_id' })
  collection: Collection;
}
