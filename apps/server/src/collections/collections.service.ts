import { Inject, Injectable } from '@nestjs/common';
import { DB } from '@server/db/drizzle.provider';
import { collections } from '@server/db/schemas';
import { InferModel } from 'drizzle-orm';

@Injectable()
export class CollectionsService {
  constructor(@Inject('DATABASE_CONNECTION') private readonly db: DB) {}

  async getCollections() {
    const result = await this.db.select().from(collections);
    return result;
  }

  async createCollection(data: InferModel<typeof collections, 'insert'>) {
    const result = await this.db.insert(collections).values(data).returning();

    return result[0];
  }
}
