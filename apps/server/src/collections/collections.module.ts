import { Module } from '@nestjs/common';
import { UsersModule } from '@server/users/users.module';
import { CollectionsController } from './collections.controller';
import { CollectionsService } from './collections.service';

@Module({
  controllers: [CollectionsController],
  providers: [CollectionsService],
  imports: [UsersModule],
})
export class CollectionsModule {}
