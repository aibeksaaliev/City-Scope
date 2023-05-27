import { IsNotEmpty } from 'class-validator';

export class CreateLocationDto {
  @IsNotEmpty()
  title: string;

  @IsNotEmpty()
  address: string;

  @IsNotEmpty()
  coordinates: string;

  @IsNotEmpty()
  description: string;

  @IsNotEmpty()
  workingHours: string;

  @IsNotEmpty()
  contacts: string;
}
