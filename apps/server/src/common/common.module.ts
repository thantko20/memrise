import { Module } from '@nestjs/common';
import { HttpLogger } from './middlewares/http-logger.middleware';

@Module({
  providers: [HttpLogger],
  exports: [HttpLogger],
})
export class CommonModule {}
