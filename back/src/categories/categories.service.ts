import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { MainCategory } from './mainCategory.entity';
import { SubCategory } from './subCategory.entity';
import { Repository } from 'typeorm';
import { CreateMainCategoryDto } from './dto/createMainCategory.dto';
import { UpdateMainCategoryDto } from './dto/updateMainCategory.dto';
import { CreateSubCategoryDto } from './dto/createSubCategory.dto';
import { UpdateSubCategoryDto } from './dto/updateSubCategory.dto';

@Injectable()
export class CategoriesService {
  constructor(
    @InjectRepository(MainCategory)
    private mainCategoryRepository: Repository<MainCategory>,
    @InjectRepository(SubCategory)
    private subCategoryRepository: Repository<SubCategory>,
  ) {}

  async createMainCategory(
    data: CreateMainCategoryDto,
    image: Express.Multer.File,
  ) {
    const newMainCategory = await this.mainCategoryRepository.create({
      title: data.title,
      image: `/uploads/categories/images/${image.filename}`,
    });
    return await this.mainCategoryRepository.save(newMainCategory);
  }

  async createSubCategory(id: number, data: CreateSubCategoryDto) {
    const selectedMainCategory = await this.mainCategoryRepository.findOne({
      where: { id },
    });
    const newSubCategory = await this.subCategoryRepository.create({
      title: data.title,
      mainCategory: selectedMainCategory,
    });
    return await this.subCategoryRepository.save(newSubCategory);
  }

  async getAllMainCategories() {
    return await this.mainCategoryRepository.find();
  }

  async getSubCategoriesByMainCategory(id: number) {
    return await this.subCategoryRepository.find({
      where: { mainCategory: { id } },
    });
  }

  async updateMainCategory(id: number, data: UpdateMainCategoryDto) {
    await this.mainCategoryRepository.update(id, data);
    return await this.mainCategoryRepository.findOne({ where: { id } });
  }

  async updateSubCategory(id: number, data: UpdateSubCategoryDto) {
    await this.subCategoryRepository.update(id, data);
    return await this.subCategoryRepository.findOne({ where: { id } });
  }

  async deleteMainCategory(id: number) {
    await this.mainCategoryRepository.delete(id);
    return { message: 'Deleted successfully' };
  }

  async deleteSubCategory(id: number) {
    await this.mainCategoryRepository.delete(id);
    return { message: 'Deleted successfully' };
  }
}
