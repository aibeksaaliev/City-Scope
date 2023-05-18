import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MainCategory } from './mainCategory.entity';
import { SubCategory } from './subCategory.entity';
import { CategoriesService } from './categories.service';
import { CategoriesController } from './categories.controller';
import { User } from '../users/user.entity';

@Module({
  imports: [TypeOrmModule.forFeature([MainCategory, SubCategory, User])],
  providers: [CategoriesService],
  exports: [CategoriesService],
  controllers: [CategoriesController],
})
export class CategoriesModule {}
