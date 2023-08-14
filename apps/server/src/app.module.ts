import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { server } from './config';
import { TestController } from './test/test.controller';
import { TestModule } from './test/test.module';

@Module({
  imports: [
    ConfigModule.forRoot({ load: [server], isGlobal: true }),
    TestModule,
  ],
  controllers: [AppController, TestController],
  providers: [AppService],
})
export class AppModule {}
