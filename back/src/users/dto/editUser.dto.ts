import { IsNotEmpty, IsOptional } from "class-validator";

export class EditUserDto {
  @IsOptional()
  firstName: string;

  @IsOptional()
  lastName: string;

  @IsOptional()
  phoneNumber: string;
}
