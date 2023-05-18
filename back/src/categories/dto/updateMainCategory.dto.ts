import { IsNotEmpty, IsString } from 'class-validator';

export class UpdateMainCategoryDto {
  @IsNotEmpty()
  @IsString()
  title: string;
}
