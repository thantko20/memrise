import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { CardsModule } from './cards/cards.module';
import { CollectionsModule } from './collections/collections.module';
import { ConfigModule } from '@nestjs/config';
import { UsersModule } from './users/users.module';
import { AuthModule } from './auth/auth.module';
import { CommonModule } from './common/common.module';
import configuration from './config/configuration';
import { HttpLogger } from './common/middlewares/http-logger.middleware';
import { JwtModule } from '@nestjs/jwt';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './users/entities/user.entity';
import { Collection } from './collections/entities/collection.entity';
import { Card } from './cards/entities/card.entity';

@Module({
  controllers: [AppController],
  providers: [AppService],
  imports: [
    TypeOrmModule.forRoot({
      url: 'postgres://thantko20:8HbovW1kIBlM@ep-lucky-wildflower-84793835-pooler.ap-southeast-1.aws.neon.tech/neondb',
      entities: [User, Collection, Card],
      synchronize: true,
      type: 'postgres',
      ssl: true,
      logging: 'all',
    }),
    ConfigModule.forRoot({
      load: [configuration],
      isGlobal: true,
    }),
    JwtModule.register({ global: true }),
    CardsModule,
    CollectionsModule,
    UsersModule,
    AuthModule,
    CommonModule,
  ],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(HttpLogger).forRoutes('*');
  }
}
