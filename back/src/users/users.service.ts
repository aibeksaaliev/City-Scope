import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './user.entity';
import { UserCreateBody } from './types';
import { EditUserDto } from './dto/editUser.dto';

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

  async editProfile(
    user: User,
    editedInfo: EditUserDto,
    avatar: Express.Multer.File,
  ) {
    const updatedInfo: Partial<User> = {
      firstName: editedInfo.firstName,
      lastName: editedInfo.lastName,
      phoneNumber: editedInfo.phoneNumber,
      avatar: avatar ? `/uploads/users/avatars/${avatar.filename}` : null,
      updatedAt: new Date(),
    };
    await this.userRepository.update(user.id, updatedInfo);
    return this.userRepository.findOne({ where: { id: user.id } });
  }
}
