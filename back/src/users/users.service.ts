import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './user.entity';
import { UserCreateBody } from './types';
import { EditUserDto } from './dto/editUser.dto';
import { BlockUserDto } from './dto/blockUser.dto';
import { UpdatePasswordDto } from './dto/updatePassword.dto';
import { Location } from '../locations/location.entity';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User) private userRepository: Repository<User>,
    @InjectRepository(Location)
    private locationsRepository: Repository<Location>,
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
    const checkedEmail = await this.userRepository.findOne({
      where: { email: editedInfo.email },
    });

    if (checkedEmail) {
      throw new BadRequestException({
        email: ['This email address is already used by other person.'],
      });
    }

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

  async blockProfile(options: BlockUserDto) {
    await this.userRepository.update(options.id, {
      isBlocked: options.isBlocked,
    });

    const user = await this.userRepository.findOne({
      where: { id: options.id },
    });

    if (user.isBlocked) {
      return { message: 'User has been blocked successfully' };
    } else {
      return { message: 'User has been unblocked successfully' };
    }
  }

  async updatePassword(user: User, passwordsInfo: UpdatePasswordDto) {
    if (passwordsInfo.newPassword === passwordsInfo.confirmedNewPassword) {
      const currentUser = await this.userRepository.findOne({
        where: { id: user.id },
      });

      const isPasswordMatch = await user.checkPassword(
        passwordsInfo.password.toString(),
      );

      if (isPasswordMatch) {
        currentUser.password = passwordsInfo.newPassword;
        await currentUser.hashPassword();
        await this.userRepository.save(currentUser);

        return { message: 'Password updated successfully' };
      }
    } else {
      throw new BadRequestException('New passwords do not match');
    }
  }

  async addLocationToFavorites(id: number, user: User) {
    try {
      const location = await this.locationsRepository.findOne({
        where: { id },
      });

      if (location) {
        user.favoriteLocations = user.favoriteLocations || [];
        user.favoriteLocations.push(location);
        location.favoritesCount++;

        await this.userRepository.save(user);
        await this.locationsRepository.save(location);

        return { message: 'Added successfully to favorites' };
      }
    } catch (error) {
      throw new Error('');
    }
  }

  async removeLocationFromFavorites(id: number, user: User) {
    try {
      const location = await this.locationsRepository.findOne({
        where: { id },
      });

      if (location) {
        user.favoriteLocations = user.favoriteLocations || [];
        user.favoriteLocations.findIndex((loc, index) => {
          if (loc === location) {
            user.favoriteLocations.splice(index, 1);
          }
        });

        location.favoritesCount--;

        await this.userRepository.save(user);
        await this.locationsRepository.save(location);

        return { message: 'Removed successfully from favorites' };
      }
    } catch (error) {
      throw new Error('');
    }
  }
}
