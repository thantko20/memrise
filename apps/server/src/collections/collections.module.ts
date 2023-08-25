import { Module } from '@nestjs/common';
import { CardsModule } from '@server/cards/cards.module';
import { UsersModule } from '@server/users/users.module';
import { CollectionsController } from './collections.controller';
import { CollectionsService } from './collections.service';

@Module({
  controllers: [CollectionsController],
  providers: [CollectionsService],
  imports: [UsersModule, CardsModule],
})
export class CollectionsModule {}
