import { Body, Controller, Post, UsePipes } from '@nestjs/common';
import { AuthService } from './auth.service';
import {
  LoginUserDto,
  loginUserBodySchema,
  RegisterUserDto,
  registerUserBodySchema,
} from './auth.schema';
import { ZodValidationPipe } from '@server/common/pipes/zod-validation.pipe';
import { Public } from './public.decorator';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Public()
  @Post('login')
  @UsePipes(new ZodValidationPipe(loginUserBodySchema))
  async login(@Body() body: LoginUserDto) {
    return await this.authService.login(body);
  }

  @Public()
  @Post('register')
  @UsePipes(new ZodValidationPipe(registerUserBodySchema))
  async register(@Body() body: RegisterUserDto) {
    return await this.authService.register(body);
  }
}
