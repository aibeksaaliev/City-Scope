import { IsEmail, IsNotEmpty, IsOptional, IsString } from "class-validator";

export class EditUserDto {
  @IsString()
  @IsNotEmpty()
  firstName: string;

  @IsString()
  @IsNotEmpty()
  lastName: string;

  @IsString()
  @IsNotEmpty()
  phoneNumber: string;

  @IsOptional()
  email: string;
}
