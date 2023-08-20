import { Global, Module } from '@nestjs/common';
import { db } from './drizzle.provider';

@Global()
@Module({
  providers: [db],
  exports: [db],
})
export class DbModule {}
