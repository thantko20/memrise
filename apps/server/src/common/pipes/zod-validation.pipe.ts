import {
  BadRequestException,
  Injectable,
  InternalServerErrorException,
  Logger,
  PipeTransform,
} from '@nestjs/common';
import { ZodError, ZodSchema } from 'zod';

@Injectable()
export class ZodValidationPipe implements PipeTransform {
  private logger = new Logger('VALIDATION');
  constructor(private schema: ZodSchema) {}

  transform(value: any) {
    try {
      const result = this.schema.parse(value);

      return result;
    } catch (error) {
      if (error instanceof ZodError) {
        throw new BadRequestException(error.format()._errors);
      }

      throw new InternalServerErrorException();
    }
  }
}
