import { Controller, Get } from '@nestjs/common';
import {
  NestControllerInterface,
  NestRequestShapes,
  TsRest,
  TsRestHandler,
  nestControllerContract,
  tsRestHandler,
} from '@ts-rest/nest';
import { AppService } from './app.service';
import { contract } from './contract';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}
}
