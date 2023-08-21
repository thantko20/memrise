import { Body, Controller, Get, Post } from '@nestjs/common';
import { User } from '@server/db/schemas';
import { CurrentUser } from '@server/users/user.decorator';
import { CollectionsService } from './collections.service';

@Controller('collections')
export class CollectionsController {
  constructor(private readonly collectionsService: CollectionsService) {}

  @Get()
  async findAll() {
    return await this.collectionsService.getCollections();
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
}
