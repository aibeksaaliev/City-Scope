import { BadRequestException, Injectable } from '@nestjs/common';
import { UsersService } from '../users/users.service';
import { RegisterDto } from './dto/register.dto';

@Injectable()
export class AuthService {
  constructor(private readonly usersService: UsersService) {}

  async register(registerDto: RegisterDto) {
    if (registerDto.password !== registerDto.confirmedPassword) {
      throw new BadRequestException('Passwords do not match');
    }
    return this.usersService.create(registerDto);
  }
}
