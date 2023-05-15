import { IsBoolean, IsNotEmpty, IsNumber } from 'class-validator';

export class BlockUserDto {
  @IsNotEmpty()
  @IsNumber()
  id: number;

  @IsNotEmpty()
  @IsBoolean()
  isBlocked: boolean;
}
