import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Location } from './location.entity';
import { LocationsService } from './locations.service';
import { LocationsController } from './locations.controller';
import { User } from '../users/user.entity';
import { SubCategory } from '../categories/subCategory.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Location, User, SubCategory])],
  providers: [LocationsService],
  exports: [LocationsService],
  controllers: [LocationsController],
})
export class LocationsModule {}
