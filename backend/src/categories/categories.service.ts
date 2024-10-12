import { Injectable } from "@nestjs/common";
import { Category } from "src/entities/category.entity";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";

@Injectable()
export class CategoriesService {
  constructor(
    @InjectRepository(Category) private categoryRepo: Repository<Category>,
  ) {}

  async getAll(): Promise<Category[]> {
    return await this.categoryRepo.find();
  }

  async getById(id: number): Promise<Category> {
    return await this.categoryRepo.findOne({ where: { id } });
  }

  async create(category: Partial<Category>): Promise<Category> {
    category.name = category.name.toLowerCase();
    const newCategory = this.categoryRepo.create(category);
    return await this.categoryRepo.save(newCategory);
  }

  async update(id: number, updatedCategory: Partial<Category>): Promise<void> {
    updatedCategory.name = updatedCategory.name.toLowerCase();
    await this.categoryRepo.update(id, updatedCategory);
  }

  async delete(id: number): Promise<void> {
    await this.categoryRepo.delete(id);
  }
}
