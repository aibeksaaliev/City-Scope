import { IsNotEmpty, IsString } from 'class-validator';

export class UpdateSubCategoryDto {
  @IsNotEmpty()
  @IsString()
  title: string;
}
