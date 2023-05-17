import {
  IsArray,
  IsNotEmpty,
  IsObject,
  IsOptional,
  IsString,
} from 'class-validator';

export class CreateLocationDto {
  @IsNotEmpty()
  title: string;

  @IsNotEmpty()
  address: string;

  @IsObject()
  @IsOptional()
  coordinates: { lat: string; lon: string };

  // @IsOptional()
  // @IsString()
  // logo: string;

  @IsNotEmpty()
  description: string;

  @IsArray()
  @IsOptional()
  images: string[];

  @IsOptional()
  @IsString()
  workingHours: string;

  @IsNotEmpty()
  contacts: string;
}
