import {
  Body,
  ClassSerializerInterceptor,
  Controller,
  Delete,
  Param,
  Patch,
  Post,
  Req,
  UploadedFile,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { EditUserDto } from './dto/editUser.dto';
import { UserRequest } from '../auth/types';
import { TokenAuthGuard } from '../auth/token-auth.guard';
import { FileInterceptor } from '@nestjs/platform-express';
import { multerAvatarsStorage } from './multer.avatarsStorage';
import { BlockUserDto } from './dto/blockUser.dto';
import { AdminGuard } from '../auth/admin.guard';
import { UpdatePasswordDto } from './dto/updatePassword.dto';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Patch('edit')
  @UseGuards(TokenAuthGuard)
  @UseInterceptors(FileInterceptor('avatar', { storage: multerAvatarsStorage }))
  async editProfile(
    @Body() body: EditUserDto,
    @Req() req: UserRequest,
    @UploadedFile() avatar: Express.Multer.File,
  ) {
    return this.usersService.editProfile(req.user, body, avatar);
  }

  @Post('addToFavorites/:id')
  @UseGuards(TokenAuthGuard)
  @UseInterceptors(ClassSerializerInterceptor)
  async addLocationToFavorites(
    @Req() req: UserRequest,
    @Param('id') id: number,
  ) {
    return this.usersService.addLocationToFavorites(id, req.user);
  }

  @Patch('block')
  @UseGuards(TokenAuthGuard, AdminGuard)
  @UseInterceptors(ClassSerializerInterceptor)
  async blockUser(@Body() body: BlockUserDto) {
    return this.usersService.blockProfile(body);
  }

  @Patch('updatePassword')
  @UseGuards(TokenAuthGuard)
  @UseInterceptors(ClassSerializerInterceptor)
  async updatePassword(
    @Body() body: UpdatePasswordDto,
    @Req() req: UserRequest,
  ) {
    return this.usersService.updatePassword(req.user, body);
  }

  @Delete('deleteFromFavorites/:id')
  @UseGuards(TokenAuthGuard)
  @UseInterceptors(ClassSerializerInterceptor)
  async removeLocationFromFavorites(
    @Req() req: UserRequest,
    @Param('id') id: number,
  ) {
    return this.usersService.removeLocationFromFavorites(id, req.user);
  }
}
