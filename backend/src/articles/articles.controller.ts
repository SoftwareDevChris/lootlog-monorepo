import {
  Body,
  Controller,
  Delete,
  ForbiddenException,
  Get,
  Param,
  Patch,
  Post,
  UploadedFile,
  UseGuards,
  UseInterceptors,
} from "@nestjs/common";
import { ArticlesService } from "./articles.service";
import { JwtAuthGuard } from "src/auth/guards/jwt-auth.guard";
import { CurrentUser } from "src/auth/decorators/current-user.decorator";
import { User } from "src/entities/user.entity";
import { CreateArticleDto } from "./dto/CreateArticle.dto";
import { UpdateArticleDto } from "./dto/UpdateArticle.dto";
import { FileInterceptor } from "@nestjs/platform-express";

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

  @Post()
  @UseGuards(JwtAuthGuard)
  @UseInterceptors(FileInterceptor("image"))
  async createArticle(
    @CurrentUser() user: User,
    @UploadedFile() image: Express.MulterFile,
    @Body() body: CreateArticleDto,
  ) {
    if (user.isAdmin || user.isAuthor) {
      const article = { ...body, imageAsFile: image };

      return await this.articlesService.createArticle(user, article);
    }

    throw new ForbiddenException();
  }

  @Get("/:id(\\d+)")
  async getArticleById(@Param("id") id: string) {
    return this.articlesService.getArticleById(parseInt(id));
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

  @Get("/category/:id")
  async getArticlesByCategory(@Param("id") id: string) {
    return this.articlesService.getArticlesByCategory(parseInt(id));
  }

  @Get("/user")
  @UseGuards(JwtAuthGuard)
  async getArticlesByUser(@CurrentUser() user: User) {
    return this.articlesService.getArticlesByAuthor(user.id);
  }

  @Delete("/:id")
  @UseGuards(JwtAuthGuard)
  async deleteArticle(@Param("id") id: string, @CurrentUser() user: User) {
    const article = await this.articlesService.getArticleById(parseInt(id));

    if (user.isAdmin || user.id === article.author.id) {
      return this.articlesService.deleteArticle(article);
    }

    throw new ForbiddenException();
  }

  @Get("/frontpage/featured")
  async getFrontpageArticles() {
    return this.articlesService.getFrontpageFeaturedArticle();
  }

  @Get("/frontpage/news")
  async getFrontpageNewsArticles() {
    return this.articlesService.getFrontpageNewsArticles();
  }

  @Get("/frontpage/review")
  async getFrontpageReviewArticles() {
    return this.articlesService.getFrontpageReviewArticles();
  }

  @Get("/frontpage/video")
  async getFrontpageVideoArticles() {
    return this.articlesService.getFrontpageVideoArticle();
  }

  @Get("/frontpage/tech")
  async getFrontpageTechArticles() {
    return this.articlesService.getFrontpageTechArticles();
  }
}
