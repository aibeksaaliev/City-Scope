import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { MainCategory } from './mainCategory.entity';

@Entity()
export class SubCategory {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  title: string;

  @ManyToOne(() => MainCategory, (mainCategory) => mainCategory.subCategories)
  mainCategory: MainCategory;
}
