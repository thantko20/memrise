import { BadRequestException, Inject, Injectable } from '@nestjs/common';
import * as argon2 from 'argon2';
import { RegisterUserDto } from '@server/auth/auth.schema';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { Repository } from 'typeorm';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User) private usersRepository: Repository<User>,
  ) {}

  async create(data: RegisterUserDto) {
    const userWithSameEmail = await this.usersRepository.findOne({
      where: {
        email: data.email,
      },
    });
    if (userWithSameEmail) {
      throw new BadRequestException('Email is already taken');
    }
    const password = await argon2.hash(data.password);
    const newUser = await this.usersRepository.save({ ...data, password });
    const { password: _, ...result } = newUser;
    return result;
  }

  async findUsers() {
    return await this.usersRepository.find();
  }

  async findUserByEmail(email: string) {
    return await this.usersRepository.findOne({ where: { email } });
  }

  async findDangerousUserByEmail(email: string) {
    return await this.usersRepository.findOne({
      where: { email },
      select: { password: true },
    });
  }

  async findUserById(id: string) {
    return await this.usersRepository.findOne({ where: { id } });
  }
}
