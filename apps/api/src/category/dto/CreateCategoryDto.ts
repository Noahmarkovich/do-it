import { IsNotEmpty, IsString, IsUUID } from 'class-validator';
import { PartialType } from '@nestjs/mapped-types';

export class CreateCategoryDto {
  @IsNotEmpty()
  @IsString()
  name: string;

  @IsNotEmpty()
  @IsString()
  color: string;

  @IsNotEmpty()
  @IsUUID()
  userId: string;
}

export class UpdateCategoryDto extends PartialType(CreateCategoryDto) {}
