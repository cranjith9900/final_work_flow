// src/user/user.service.ts
import { ConflictException, Injectable, UnauthorizedException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './user.entity';
import { CreateUserDto } from './dto/create-user.dto';
import { SignupDto } from './dto/signup.dto';
import { SigninDto } from './dto/signin.dto';
import { JWT_PASSWORD } from 'src/auth/config';
import * as jwt from 'jsonwebtoken';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User) private readonly userRepo: Repository<User>,
  ) {}

  async signup(data: SignupDto) {
    const exists = await this.userRepo.findOne({ where: { email: data.email } });
    if (exists) {
      throw new ConflictException('User already exists');
    }

    const user = this.userRepo.create({
      email: data.email,
      password: data.password, 
      name: data.name,
    });

    await this.userRepo.save(user);

    return {
      message: 'Please verify your account by checking your email',
    };
  }

  async signin(data: SigninDto) {
    const user = await this.userRepo.findOne({
      where: {
        email: data.email,
        password: data.password, // ❗TODO: Use bcrypt here
      },
    });

    if (!user) {
      throw new UnauthorizedException('Credentials are incorrect');
    }

    const token = jwt.sign({ id: user.id }, JWT_PASSWORD);

    return { token };
  }

  async getUserById(id: string) {
    const user = await this.userRepo.findOne({
      where: { id: Number(id) },
      select: ['id', 'email'],
    });

    return { id: user.id };
  }
}
