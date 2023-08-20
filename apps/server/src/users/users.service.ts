import { BadRequestException, Inject, Injectable } from '@nestjs/common';
import * as argon2 from 'argon2';
import { DB } from '@server/db/drizzle.provider';
import { User, users } from '@server/db/schemas';
import { eq } from 'drizzle-orm';

@Injectable()
export class UsersService {
  constructor(@Inject('DATABASE_CONNECTION') private readonly db: DB) {}

  async create(data: Pick<User, 'name' | 'password' | 'email'>) {
    const uniqueEmail = await this.db
      .select({ id: users.id })
      .from(users)
      .where(eq(users.email, data.email));
    if (uniqueEmail.length > 0) {
      throw new BadRequestException('Email is already taken');
    }
    const password = await argon2.hash(data.password);
    const result = await this.db
      .insert(users)
      .values({ ...data, password })
      .returning({ userId: users.id });

    return result[0];
  }

  async findUsers() {
    const result = await this.db
      .select({ id: users.id, name: users.name, email: users.email })
      .from(users);
    return result;
  }

  findOne(id: number) {
    return `This action returns a #${id} user`;
  }
}
