import {
  Body,
  Controller,
  Patch,
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

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Patch('edit')
  @UseGuards(TokenAuthGuard)
  @UseInterceptors(FileInterceptor('avatar', { storage: multerAvatarsStorage }))
  async editProfile(
    @Body() formData: EditUserDto,
    @Req() req: UserRequest,
    @UploadedFile() avatar: Express.Multer.File,
  ) {
    return this.usersService.editProfile(req.user, formData, avatar);
  }
}
