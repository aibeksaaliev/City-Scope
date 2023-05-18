import { IsBoolean, IsNotEmpty, IsNumber } from 'class-validator';

export class ApproveLocationDto {
  @IsNotEmpty()
  @IsNumber()
  subCategoryId: number;

  @IsNotEmpty()
  @IsBoolean()
  status: boolean;
}
