import {
  Body,
  ClassSerializerInterceptor,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Req,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { LocationsService } from './locations.service';
import { CreateLocationDto } from './dto/createLocation.dto';
import { TokenAuthGuard } from '../auth/token-auth.guard';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from '../users/user.entity';
import { Repository } from 'typeorm';
import { UserRequest } from '../auth/types';
import { UpdateLocationDto } from './dto/updateLocation.dto';
import { RoleGuard } from '../auth/role.guard';
import { ApproveLocationDto } from './dto/approveLocation.dto';

@Controller('locations')
export class LocationsController {
  constructor(
    @InjectRepository(User) private readonly userRepository: Repository<User>,
    private readonly locationsService: LocationsService,
  ) {}

  @Post()
  @UseGuards(TokenAuthGuard)
  @UseInterceptors(ClassSerializerInterceptor)
  async createLocation(
    @Body() body: CreateLocationDto,
    @Req() req: UserRequest,
  ) {
    return this.locationsService.createLocation(body, req.user);
  }

  @Get()
  @UseInterceptors(ClassSerializerInterceptor)
  async getAllLocations() {
    return this.locationsService.getAllLocations();
  }

  @Get(':id')
  @UseInterceptors(ClassSerializerInterceptor)
  async getOneLocationById(@Param('id') id: number) {
    return this.locationsService.findById(id);
  }

  @Patch(':id')
  @UseGuards(TokenAuthGuard)
  @UseInterceptors(ClassSerializerInterceptor)
  async updateLocation(
    @Body() body: UpdateLocationDto,
    @Req() req: UserRequest,
    @Param('id') id: number,
  ) {
    return this.locationsService.updateLocation(id, body, req.user);
  }

  @Patch('approveLocation/:id')
  @UseGuards(TokenAuthGuard, RoleGuard)
  @UseInterceptors(ClassSerializerInterceptor)
  async approveLocation(
    @Body() body: ApproveLocationDto,
    @Req() req: UserRequest,
    @Param('id') id: number,
  ) {
    return this.locationsService.approveLocation(id, body, req.user);
  }

  @Delete(':id')
  @UseGuards(TokenAuthGuard)
  @UseInterceptors(ClassSerializerInterceptor)
  async deleteLocation(@Req() req: UserRequest, @Param('id') id: number) {
    return this.locationsService.deleteLocation(id, req.user);
  }
}
