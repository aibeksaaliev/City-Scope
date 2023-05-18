import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './user.entity';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { AuthService } from '../auth/auth.service';
import { LocalStrategy } from '../auth/local.strategy';
import { Location } from '../locations/location.entity';

@Module({
  imports: [TypeOrmModule.forFeature([User, Location])],
  providers: [UsersService, AuthService, LocalStrategy],
  exports: [UsersService],
  controllers: [UsersController],
})
export class UsersModule {}
