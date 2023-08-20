import { Module } from '@nestjs/common';
import { db } from './drizzle.provider';

@Module({
  providers: [db],
  exports: [db],
})
export class DbModule {}
