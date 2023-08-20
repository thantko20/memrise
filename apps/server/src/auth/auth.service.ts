import { BadRequestException, Inject, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as argon2 from 'argon2';
import { DB } from '@server/db/drizzle.provider';
import { users } from '@server/db/schemas';
import { eq } from 'drizzle-orm';
import { LoginUserDto, RegisterUserDto } from './auth.schema';
import { UsersService } from '@server/users/users.service';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class AuthService {
  constructor(
    @Inject('DATABASE_CONNECTION') private readonly db: DB,
    private readonly usersService: UsersService,
    private readonly jwtService: JwtService,
    private readonly configService: ConfigService,
  ) {}

  async login({ email, password }: LoginUserDto) {
    const invalidCredentialsError = new BadRequestException(
      'Invalid credentials',
    );
    const [user] = await this.db
      .select()
      .from(users)
      .where(eq(users.email, email));

    if (!user) {
      throw invalidCredentialsError;
    }

    const isCorrectPassword = await argon2.verify(user.password, password);

    if (!isCorrectPassword) {
      throw invalidCredentialsError;
    }

    const { password: _, ...result } = user;
    const token = await this.jwtService.signAsync(
      {
        id: user.id,
        email: user.email,
      },
      { secret: this.configService.get('jwt_secret') },
    );
    return { user: result, accessToken: token };
  }

  async register(data: RegisterUserDto) {
    return await this.usersService.create(data);
  }
}
