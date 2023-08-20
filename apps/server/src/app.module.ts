import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { CardsModule } from './cards/cards.module';
import { CollectionsModule } from './collections/collections.module';
import { DbModule } from './db/db.module';
import { ConfigModule } from '@nestjs/config';
import configuration from './config/configuration';

@Module({
  controllers: [AppController],
  providers: [AppService],
  imports: [
    ConfigModule.forRoot({
      load: [configuration],
      isGlobal: true,
    }),
    CardsModule,
    CollectionsModule,
    DbModule,
  ],
})
export class AppModule {}
