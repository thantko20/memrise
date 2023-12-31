import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { User } from '@server/users/entities/user.entity';
import { CurrentUser } from '@server/users/user.decorator';
import { AddCardToCollectionDto } from './collections.schema';
import { CollectionsService } from './collections.service';

@Controller('collections')
export class CollectionsController {
  constructor(private readonly collectionsService: CollectionsService) {}

  @Get()
  async findAll() {
    return await this.collectionsService.getCollections();
  }

  @Get('me')
  async getMyCollections(@CurrentUser() user: User) {
    return await this.collectionsService.getCollections({ userId: user.id });
  }

  @Post()
  async createCollection(
    @Body() data: { name: string; description: string },
    @CurrentUser() user: User,
  ) {
    return await this.collectionsService.createCollection({
      ...data,
      userId: user.id,
    });
  }

  @Post(':id/cards')
  async addCardToCollection(
    @Body() data: AddCardToCollectionDto,
    @CurrentUser() user: User,
    @Param('id') collectionId: string,
  ) {
    return await this.collectionsService.addCardToCollection(
      collectionId,
      data,
      user,
    );
  }
}
