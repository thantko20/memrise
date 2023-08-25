import {
  Body,
  Controller,
  ForbiddenException,
  NotFoundException,
  Post,
} from '@nestjs/common';
import { CollectionsService } from '@server/collections/collections.service';
import { User } from '@server/db/schemas';
import { CurrentUser } from '@server/users/user.decorator';
import { CreateCardDto } from './cards.schema';
import { CardsService } from './cards.service';

@Controller('cards')
export class CardsController {
  constructor() {}
}
