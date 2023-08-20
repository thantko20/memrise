import {
  BadRequestException,
  Body,
  Controller,
  Get,
  Post,
} from '@nestjs/common';
import { collections } from '@server/db/schemas';
import { UsersService } from '@server/users/users.service';
import { randomUUID } from 'crypto';
import { InferModel } from 'drizzle-orm';
import { CollectionsService } from './collections.service';

@Controller('collections')
export class CollectionsController {
  constructor(
    private readonly collectionsService: CollectionsService,
    private readonly usersService: UsersService,
  ) {}

  @Get()
  async findAll() {
    return await this.collectionsService.getCollections();
  }

  @Post()
  async createCollection(@Body() data: { name: string; description: string }) {
    const users = await this.usersService.findUsers();
    if (users.length === 0) {
      throw new BadRequestException('No users found');
    }
    return await this.collectionsService.createCollection({
      ...data,
      userId: users[0].id,
    });
  }
}
