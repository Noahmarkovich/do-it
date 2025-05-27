import { PartialType } from '@nestjs/mapped-types';
import { IsBoolean, IsOptional, IsString, IsUUID } from 'class-validator';
import { IsNotEmpty } from 'class-validator';

export class CreateTaskDto {
  @IsNotEmpty()
  @IsString()
  title: string;

  @IsOptional()
  @IsString()
  description: string;

  @IsNotEmpty()
  @IsUUID()
  userId: string;

  @IsNotEmpty()
  @IsUUID()
  categoryId: string;

  @IsOptional()
  @IsString()
  dueDate: string;

  @IsBoolean()
  isCompleted: boolean;
}

export class UpdateTaskDto extends PartialType(CreateTaskDto) {}
