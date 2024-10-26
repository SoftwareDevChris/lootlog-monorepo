import {
  Body,
  Controller,
  ForbiddenException,
  Get,
  Param,
  Patch,
  Post,
  UseGuards,
  UseInterceptors,
} from "@nestjs/common";
import { ArticlesService } from "./articles.service";
import { Article } from "src/entities/article.entity";
import { JwtAuthGuard } from "src/auth/guards/jwt-auth.guard";
import { CurrentUser } from "src/auth/decorators/current-user.decorator";
import { User } from "src/entities/user.entity";
import { CreateArticleDto } from "./dto/CreateArticle.dto";
import { UpdateArticleDto } from "./dto/UpdateArticle.dto";

@Controller("/api/articles")
export class ArticlesController {
  constructor(private readonly articlesService: ArticlesService) {}

  @Get()
  @UseGuards(JwtAuthGuard)
  async getAllArticles(@CurrentUser() user: User) {
    if (user.isAdmin) return this.articlesService.getAllArticles();
    else if (user.isAuthor)
      return this.articlesService.getArticlesByAuthor(user.id);
    else throw new ForbiddenException();
  }

  @Get("/category/:id")
  async getArticlesByCategory(@Param("id") id: string) {
    return this.articlesService.getArticlesByCategory(parseInt(id));
  }

  @Get("/:id(\\d+)")
  async getArticleById(@Param("id") id: string) {
    return this.articlesService.getArticleById(parseInt(id));
  }

  @Get("/user")
  @UseGuards(JwtAuthGuard)
  async getArticlesByUser(@CurrentUser() user: User) {
    return this.articlesService.getArticlesByAuthor(user.id);
  }

  @Patch("/:id")
  @UseGuards(JwtAuthGuard)
  async updateArticleById(
    @CurrentUser() user: User,
    @Body() article: UpdateArticleDto,
  ) {
    if (article.author.id === user.id) {
      return this.articlesService.updateArticle(user.id, article);
    }

    throw new ForbiddenException();
  }

  @Post()
  @UseGuards(JwtAuthGuard)
  async createArticle(
    @CurrentUser() user: User,
    @Body() article: CreateArticleDto,
  ) {
    if (user.isAdmin || user.isAuthor) {
      console.log("Article body:", article);
      return await this.articlesService.createArticle(user, article);
    }

    throw new ForbiddenException();
  }
}
