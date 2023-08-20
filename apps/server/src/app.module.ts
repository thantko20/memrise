import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { CardsModule } from './cards/cards.module';
import { CollectionsModule } from './collections/collections.module';

@Module({
  controllers: [AppController],
  providers: [AppService],
  imports: [CardsModule, CollectionsModule],
})
export class AppModule {}
