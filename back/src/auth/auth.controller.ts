import {
  Body,
  ClassSerializerInterceptor,
  Controller,
  Delete,
  Post,
  Req,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { RegisterDto } from './dto/register.dto';
import { User } from '../users/user.entity';
import { AuthGuard } from '@nestjs/passport';
import { UserRequest } from './types';
import { TokenAuthGuard } from './token-auth.guard';

@Controller('authorization')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('register')
  @UseInterceptors(ClassSerializerInterceptor)
  async register(@Body() body: RegisterDto) {
    return this.authService.register(body);
  }

  @Post('sessions')
  @UseGuards(AuthGuard('local'))
  @UseInterceptors(ClassSerializerInterceptor)
  async login(@Req() req: UserRequest) {
    return req.user as User;
  }

  @Delete('sessions')
  @UseGuards(TokenAuthGuard)
  @UseInterceptors(ClassSerializerInterceptor)
  async logout() {
    return { message: 'Logout successful' };
  }
}
