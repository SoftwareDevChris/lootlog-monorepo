import {
  Controller,
  UseGuards,
  Get,
  Param,
  Post,
  Body,
  UnauthorizedException,
} from "@nestjs/common";
import { CategoriesService } from "./categories.service";
import { JwtAuthGuard } from "src/auth/guards/jwt-auth.guard";
import { CurrentUser } from "src/auth/decorators/current-user.decorator";
import { User } from "src/entities/user.entity";
import { Category } from "src/entities/category.entity";

@Controller("/api/categories")
export class CategoriesController {
  constructor(private readonly categoriesService: CategoriesService) {}

  @Get()
  async getAllCategories() {
    return await this.categoriesService.getAll();
  }

  @Get("/:id")
  @UseGuards(JwtAuthGuard)
  async getCategoryById(@Param("id") id: string) {
    return this.categoriesService.getById(parseInt(id));
  }

  @Post()
  @UseGuards(JwtAuthGuard)
  async createCategory(
    @CurrentUser() user: User,
    @Body() body: Partial<Category>,
  ): Promise<Category> {
    if (user.isAdmin) {
      return this.categoriesService.create(body);
    }

    throw new UnauthorizedException();
  }
}
