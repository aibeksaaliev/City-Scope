import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './user.entity';
import { UserCreateBody } from './types';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User) private userRepository: Repository<User>,
  ) {}

  async create(body: UserCreateBody) {
    const user = this.userRepository.create(body);
    await user.generateToken();
    return this.userRepository.save(user);
  }

  async findByEmail(email: string) {
    return await this.userRepository.findOne({ where: { email } });
  }

  async save(user: User) {
    return this.userRepository.save(user);
  }
}
