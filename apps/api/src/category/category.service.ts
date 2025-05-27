import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { Prisma } from '@prisma/client';
import { CreateCategoryDto } from './dto/CreateCategoryDto';

@Injectable()
export class CategoryService {
  constructor(private prisma: PrismaService) {}

  async create(createCategoryDto: CreateCategoryDto) {
    return this.prisma.category.create({
      data: {
        ...createCategoryDto,
      },
      include: {
        tasks: true,
      },
    });
  }

  async findAll(userId: string) {
    return this.prisma.category.findMany({
      where: { userId },
      include: {
        tasks: true,
      },
    });
  }

  async update(id: string, updateCategoryDto: Prisma.CategoryUpdateInput) {
    return this.prisma.category.update({
      where: { id },
      data: updateCategoryDto,
      include: {
        tasks: true,
      },
    });
  }

  async remove(id: string) {
    if (!id) {
      throw new NotFoundException('Category ID is required');
    }
    return this.prisma.category.delete({
      where: { id },
    });
  }
}
