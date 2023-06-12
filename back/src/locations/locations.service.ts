import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Location } from './location.entity';
import { Repository } from 'typeorm';
import { CreateLocationDto } from './dto/createLocation.dto';
import { User } from '../users/user.entity';
import { UpdateLocationDto } from './dto/updateLocation.dto';
import { SubCategory } from '../categories/subCategory.entity';
import { ApproveLocationDto } from './dto/approveLocation.dto';

@Injectable()
export class LocationsService {
  constructor(
    @InjectRepository(Location)
    private locationRepository: Repository<Location>,
    @InjectRepository(SubCategory)
    private readonly subCategoryRepository: Repository<SubCategory>,
  ) {}

  async findById(id: number) {
    return this.locationRepository
      .createQueryBuilder('location')
      .where({ id })
      .leftJoinAndSelect('location.feedbacks', 'feedback')
      .leftJoinAndSelect('feedback.user', 'feedbackUser')
      .leftJoinAndSelect('feedback.location', 'feedbackLocation')
      .getOne();
  }

  async createLocation(
    data: CreateLocationDto,
    user: User,
    images: Express.Multer.File[],
  ) {
    try {
      const coordinates = JSON.parse(data.coordinates);

      const newLocation: Partial<Location> = {
        user: user,
        title: data.title,
        address: data.address,
        coordinates: {
          lat: coordinates.lat,
          lng: coordinates.lng,
        },
        images: images.map(
          (image) => `/uploads/locations/images/${image.filename}`,
        ),
        description: data.description,
        workingHours: data.workingHours,
        contacts: data.contacts,
      };
      await this.locationRepository.save(newLocation);
      return newLocation;
    } catch {
      throw new Error('');
    }
  }

  async getAllApprovedLocations() {
    return await this.locationRepository.find({
      where: { isApproved: true },
      relations: ['feedbacks'],
    });
  }

  async getAllNonApprovedLocations() {
    return await this.locationRepository.find({
      where: { isApproved: false },
      relations: ['feedbacks', 'users'],
    });
  }

  async gelLocationsBySubCategory(subCategoryId: number) {
    return this.locationRepository
      .createQueryBuilder('location')
      .leftJoinAndSelect('location.subCategory', 'subCategory')
      .leftJoinAndSelect('location.feedbacks', 'feedback')
      .leftJoinAndSelect('feedback.user', 'feedbackUser')
      .leftJoinAndSelect('feedback.location', 'feedbackLocation')
      .where('subCategory.id = :subCategoryId', { subCategoryId })
      .andWhere('location.isApproved = :isApproved', { isApproved: true })
      .getMany();
  }

  async getLocationsByAddress(address: string) {
    return this.locationRepository.find({
      where: { address },
      relations: ['feedbacks'],
    });
  }

  async updateLocation(id: number, data: UpdateLocationDto, user: User) {
    try {
      const location = await this.locationRepository.findOne({
        where: { id, user: { id: user.id } },
      });

      if (location) {
        await this.locationRepository.update(location.id, data);
        await this.locationRepository.update(location.id, {
          updatedAt: new Date(),
        });
        return this.locationRepository.findOne({ where: { id: location.id } });
      }
    } catch {
      throw new Error('');
    }
  }

  async deleteLocation(id: number, user: User) {
    try {
      const deletingLocation = await this.locationRepository.findOne({
        where: { id, user: { id: user.id } },
      });
      await this.locationRepository.delete(deletingLocation.id);
      return { message: 'Deleted successfully' };
    } catch {
      throw new Error('');
    }
  }

  async approveLocation(id: number, data: ApproveLocationDto, user: User) {
    try {
      const selectedSubCategory = await this.subCategoryRepository.findOne({
        where: { id: data.subCategoryId },
      });

      if (selectedSubCategory) {
        await this.locationRepository.update(id, {
          subCategory: selectedSubCategory,
          approvedBy: user,
          approvedAt: new Date(),
          isApproved: data.status,
        });

        return await this.locationRepository.findOne({ where: { id } });
      }
    } catch {
      throw new Error('');
    }
  }
}
