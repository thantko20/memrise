import { Inject, Injectable } from '@nestjs/common';
import { DB } from '@server/db/drizzle.provider';
import { collections } from '@server/db/schemas';

@Injectable()
export class CollectionsService {
  constructor(@Inject('DATABASE_CONNECTION') private readonly db: DB) {}

  async getCollections() {
    const result = await this.db.select().from(collections);
    return result;
  }
}
