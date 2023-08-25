import {
  BadRequestException,
  ForbiddenException,
  Injectable,
  Logger,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CardsService } from '@server/cards/cards.service';
import { User } from '@server/users/entities/user.entity';
import { DeepPartial, FindManyOptions, Repository } from 'typeorm';
import { AddCardToCollectionDto } from './collections.schema';
import { Collection } from './entities/collection.entity';

@Injectable()
export class CollectionsService {
  private logger = new Logger('CollectionsService');
  constructor(
    @InjectRepository(Collection)
    private readonly collectionsRepository: Repository<Collection>,
    private readonly cardsService: CardsService,
  ) {}

  async getCollections(data?: Partial<{ userId: string }>) {
    this.logger.debug(data);
    const where: FindManyOptions<Collection>['where'] = {};
    if (data?.userId) {
      where.userId = data.userId;
    }
    const collections = await this.collectionsRepository.find({
      where,
      relations: {
        user: true,
      },
    });
    return collections;
  }

  async createCollection(data: DeepPartial<Collection>) {
    const collection = this.collectionsRepository.create(data);
    return await this.collectionsRepository.save(collection);
  }

  async getCollectionById(id: string) {
    return await this.collectionsRepository.findBy({ id });
  }

  async addCardToCollection(
    collectionId: string,
    cardData: AddCardToCollectionDto,
    user: User,
  ) {
    const collection = await this.collectionsRepository.findOneBy({
      id: collectionId,
    });
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
