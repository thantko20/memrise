import { InferModel } from 'drizzle-orm';
import { pgTable, text, timestamp, uuid, varchar } from 'drizzle-orm/pg-core';

export type User = InferModel<typeof users>;
export type Collection = InferModel<typeof collections>;
export type Card = InferModel<typeof cards>;

export const users = pgTable('users', {
  id: uuid('id').defaultRandom().notNull().primaryKey(),
  name: varchar('name', { length: 256 }).notNull(),
  password: varchar('password', { length: 256 }).notNull(),
  email: varchar('email', { length: 256 }).notNull(),
  createdAt: timestamp('created_at').defaultNow().notNull(),
  updatedAt: timestamp('updated_at').defaultNow().notNull(),
});

export const collections = pgTable('collections', {
  id: uuid('id').defaultRandom().notNull().primaryKey(),
  name: varchar('name', { length: 256 }).notNull(),
  description: text('description').notNull(),
  createdAt: timestamp('created_at').defaultNow().notNull(),
  updatedAt: timestamp('updated_at').defaultNow().notNull(),
  userId: uuid('user_id')
    .notNull()
    .references(() => users.id),
});

export const cards = pgTable('cards', {
  id: uuid('id').defaultRandom().notNull().primaryKey(),
  front: text('front').notNull(),
  back: text('back').notNull(),
  createdAt: timestamp('created_at').defaultNow().notNull(),
  updatedAt: timestamp('updated_at').defaultNow().notNull(),
  collectionId: uuid('collection_id')
    .notNull()
    .references(() => collections.id),
});
