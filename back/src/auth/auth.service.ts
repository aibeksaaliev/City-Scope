import { BadRequestException, Inject, Injectable } from '@nestjs/common';
import { UsersService } from '../users/users.service';
import { RegisterDto } from './dto/register.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from '../users/user.entity';
import { Repository } from 'typeorm';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(User) private readonly userRepository: Repository<User>,
    private readonly usersService: UsersService,
  ) {}

  async register(registerDto: RegisterDto) {
    if (registerDto.password !== registerDto.confirmedPassword) {
      throw new BadRequestException('Passwords do not match');
    }
    return this.usersService.create(registerDto);
  }

  async validateUser(email: string, password: string) {
    const user = await this.usersService.findByEmail(email);

    if (!user) {
      throw new BadRequestException('Incorrect e-mail');
    }

    const isPasswordMatch = await user.checkPassword(password);

    if (isPasswordMatch) {
      await user.generateToken();
      user.lastLogin = new Date();
      await this.usersService.save(user);
      return user;
    }

    return null;
  }

  async logout(user: User) {
    await user.generateToken();
    await this.userRepository.save(user);
  }
}
