import { BadRequestException, Injectable } from '@nestjs/common';
import { UsersService } from '../users/users.service';
import { RegisterDto } from './dto/register.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from '../users/user.entity';
import { Repository } from 'typeorm';
import axios from 'axios';
import { randomUUID } from 'crypto';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(User) private readonly userRepository: Repository<User>,
    private readonly usersService: UsersService,
  ) {}

  async register(registerDto: RegisterDto) {
    const user = await this.usersService.findByEmail(registerDto.email);

    if (user) {
      throw new BadRequestException({
        email: ['User with this email is already registered'],
      });
    }

    if (registerDto.password !== registerDto.confirmedPassword) {
      throw new BadRequestException({
        password: ['Passwords do not match'],
        confirmedPassword: ['Passwords do not match'],
      });
    }

    return this.usersService.create(registerDto);
  }

  async registerUserWithGoogle(accessToken: string) {
    try {
      const response = await axios.get(
        `https://www.googleapis.com/oauth2/v1/userinfo?access_token=${accessToken}`,
      );

      const {
        email,
        id: googleId,
        given_name: firstName,
        family_name: lastName,
        picture: avatar,
      } = response.data;

      if (!email) {
        return new BadRequestException('Not enough user data to continue.');
      }

      let user = await this.userRepository.findOne({
        where: { googleId },
      });

      if (!user) {
        user = await this.userRepository.create({
          email,
          firstName,
          lastName,
          googleId,
          avatar,
          password: randomUUID(),
        });

        await user.generateToken();
        return await this.userRepository.save(user);
      }
      return user;
    } catch (e) {
      throw new BadRequestException(e.message);
    }
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
    return { message: 'Logout successful' };
  }
}
