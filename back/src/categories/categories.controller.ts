import {
  Body,
  ClassSerializerInterceptor,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Query,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { CategoriesService } from './categories.service';
import { TokenAuthGuard } from '../auth/token-auth.guard';
import { CreateMainCategoryDto } from './dto/createMainCategory.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from '../users/user.entity';
import { Repository } from 'typeorm';
import { RoleGuard } from '../auth/role.guard';
import { UpdateMainCategoryDto } from './dto/updateMainCategory.dto';
import { CreateSubCategoryDto } from './dto/createSubCategory.dto';
import { UpdateSubCategoryDto } from './dto/updateSubCategory.dto';

@Controller('categories')
export class CategoriesController {
  constructor(
    @InjectRepository(User) userRepository: Repository<User>,
    private readonly categoriesService: CategoriesService,
  ) {}

  @Post('createMainCategory')
  @UseGuards(TokenAuthGuard, RoleGuard)
  @UseInterceptors(ClassSerializerInterceptor)
  async createMainCategory(@Body() body: CreateMainCategoryDto) {
    return this.categoriesService.createMainCategory(body);
  }

  @Post('createSubCategory')
  @UseGuards(TokenAuthGuard, RoleGuard)
  @UseInterceptors(ClassSerializerInterceptor)
  async createSubCategory(
    @Body() body: CreateSubCategoryDto,
    @Query('mainCategoryId') mainCategoryId: number,
  ) {
    return this.categoriesService.createSubCategory(mainCategoryId, body);
  }

  @Get('mainCategories')
  @UseInterceptors(ClassSerializerInterceptor)
  async getAllMainCategories() {
    return this.categoriesService.getAllMainCategories();
  }

  @Get('subCategoriesByMainCategory')
  @UseInterceptors(ClassSerializerInterceptor)
  async getSubCategoriesByMainCategory(@Query('mainCategoryId') id: number) {
    return this.categoriesService.getSubCategoriesByMainCategory(id);
  }

  @Patch('updateMainCategory/:id')
  @UseGuards(TokenAuthGuard, RoleGuard)
  @UseInterceptors(ClassSerializerInterceptor)
  async updateOneMainCategory(
    @Body() body: UpdateMainCategoryDto,
    @Param('id') id: number,
  ) {
    return this.categoriesService.updateMainCategory(id, body);
  }

  @Patch('updateSubCategory/:id')
  @UseGuards(TokenAuthGuard, RoleGuard)
  @UseInterceptors(ClassSerializerInterceptor)
  async updateOneSubCategory(
    @Body() body: UpdateSubCategoryDto,
    @Param('id') id: number,
  ) {
    return this.categoriesService.updateSubCategory(id, body);
  }

  @Delete('deleteMainCategory/:id')
  @UseGuards(TokenAuthGuard, RoleGuard)
  @UseInterceptors(ClassSerializerInterceptor)
  async deleteOneMainCategory(@Param('id') id: number) {
    return this.categoriesService.deleteMainCategory(id);
  }

  @Delete('deleteSubCategory/:id')
  @UseGuards(TokenAuthGuard, RoleGuard)
  @UseInterceptors(ClassSerializerInterceptor)
  async deleteOneSubCategory(@Param('id') id: number) {
    return this.categoriesService.deleteSubCategory(id);
  }
}
