import {
  BadRequestException,
  ForbiddenException,
  Inject,
  Injectable,
} from '@nestjs/common';
import { CreateCardDto } from '@server/cards/cards.schema';
import { CardsService } from '@server/cards/cards.service';
import { DB } from '@server/db/drizzle.provider';
import { Card, collections, User } from '@server/db/schemas';
import { eq, InferModel } from 'drizzle-orm';
import { AddCardToCollectionDto } from './collections.schema';

@Injectable()
export class CollectionsService {
  constructor(
    @Inject('DATABASE_CONNECTION') private readonly db: DB,
    private readonly cardsService: CardsService,
  ) {}

  async getCollections() {
    const result = await this.db.select().from(collections);
    return result;
  }

  async createCollection(data: InferModel<typeof collections, 'insert'>) {
    const result = await this.db.insert(collections).values(data).returning();

    return result[0];
  }

  async getCollectionById(id: string) {
    const result = await this.db
      .select()
      .from(collections)
      .where(eq(collections.id, id))
      .limit(1);

    return result[0];
  }

  async addCardToCollection(
    collectionId: string,
    cardData: AddCardToCollectionDto,
    user: User,
  ) {
    const [collection] = await this.db
      .select()
      .from(collections)
      .where(eq(collections.id, collectionId))
      .limit(1);
    if (!collection) {
      throw new BadRequestException('Collection does not exist');
    }

    if (user.id !== collection.userId) {
      throw new ForbiddenException();
    }

    const newCard = await this.cardsService.createCard({
      ...cardData,
      collectionId,
    });
    return newCard;
  }
}
