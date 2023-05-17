import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Location } from './location.entity';
import { Repository } from 'typeorm';
import { CreateLocationDto } from './dto/createLocation.dto';
import { User } from '../users/user.entity';
import { UpdateLocationDto } from './dto/updateLocation.dto';

@Injectable()
export class LocationsService {
  constructor(
    @InjectRepository(Location)
    private locationRepository: Repository<Location>,
  ) {}

  async findById(id: number) {
    return await this.locationRepository.findOne({ where: { id } });
  }

  async createLocation(data: CreateLocationDto, user: User) {
    try {
      const newLocation: Partial<Location> = {
        user: user,
        title: data.title,
        address: data.address,
        coordinates: {
          lat: data.coordinates.lat,
          lon: data.coordinates.lon,
        },
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

  async getAllLocations() {
    return await this.locationRepository.find();
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
}
