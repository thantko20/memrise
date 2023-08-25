import { Inject, Injectable } from '@nestjs/common';
import { DB } from '@server/db/drizzle.provider';
import { cards } from '@server/db/schemas';
import { CreateCardDto } from './cards.schema';

@Injectable()
export class CardsService {
  constructor(@Inject('DATABASE_CONNECTION') private readonly db: DB) {}

  async createCard(data: CreateCardDto) {
    return await this.db.insert(cards).values(data).returning();
  }
}
