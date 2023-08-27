import { Card } from '@server/cards/entities/card.entity';
import { User } from '@server/users/entities/user.entity';
import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity({ name: 'collections' })
export class Collection {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ name: 'name', type: 'varchar', length: 50 })
  name: string;

  @Column({ name: 'description', type: 'text', nullable: true })
  description?: string;

  @Column({ name: 'user_id' })
  userId: string;

  @OneToMany(() => Card, (card) => card.collection)
  cards: Card[];

  @ManyToOne(() => User, (user) => user.id, {})
  @JoinColumn({ name: 'user_id', referencedColumnName: 'id' })
  user: User;
}
