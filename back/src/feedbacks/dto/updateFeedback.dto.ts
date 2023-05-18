import { IsNumber, IsOptional, IsString } from 'class-validator';

export class UpdateFeedbackDto {
  @IsOptional()
  @IsNumber()
  rating: number;

  @IsOptional()
  @IsString()
  comment: string;
}
