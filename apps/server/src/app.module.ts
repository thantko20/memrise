import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { server } from './config';

@Module({
  imports: [ConfigModule.forRoot({ load: [server], isGlobal: true })],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
