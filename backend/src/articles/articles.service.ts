import { Injectable, InternalServerErrorException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Article } from "src/entities/article.entity";
import { Repository } from "typeorm";
import { CreateArticleDto } from "./dto/CreateArticle.dto";
import { User } from "src/entities/user.entity";
import { CategoriesService } from "src/categories/categories.service";
import { UsersService } from "src/users/users.service";
import { ImagesService } from "src/images/images.service";
import { UpdateArticleDto } from "./dto/UpdateArticle.dto";

@Injectable()
export class ArticlesService {
  constructor(
    @InjectRepository(Article) private articleRepo: Repository<Article>,
    private categoriesService: CategoriesService,
    private usersService: UsersService,
    private imagesService: ImagesService,
  ) {}

  async getAllArticles(): Promise<Article[]> {
    return await this.articleRepo.find({ relations: ["category"] });
  }

  async getFrontpageFeaturedArticle(): Promise<Article> {
    return await this.articleRepo.findOne({
      where: { isPublic: true, isFeatured: true },
      relations: ["image"],
      order: { createdAt: "DESC" },
    });
  }

  async getFrontpageNewsArticles(): Promise<Article[]> {
    return await this.articleRepo.find({
      where: { isPublic: true, isFeatured: false },
      take: 10,
      relations: ["image"],
      order: { createdAt: "DESC" },
    });
  }

  async getFrontpageReviewArticles(): Promise<Article[]> {
    return await this.articleRepo.find({
      where: {
        isPublic: true,
        isFeatured: false,
        category: { name: "review" },
      },
      take: 10,
      relations: ["image"],
      order: { createdAt: "DESC" },
    });
  }

  async getFrontpageArticles() {
    const featuredArticle = await this.getFrontpageFeaturedArticle();
    const otherNewsArticles = await this.getFrontpageNewsArticles();
    const reviewArticles = await this.getFrontpageReviewArticles();

    return {
      featured: featuredArticle,
      news: otherNewsArticles,
      reviews: reviewArticles,
    };
  }

  async getArticlesByAuthor(userId: number): Promise<Article[]> {
    return await this.articleRepo.find({
      where: { author: { id: userId } },
      relations: ["category"],
    });
  }

  async getArticlesByCategory(categoryId: number): Promise<Article[]> {
    return await this.articleRepo.find({
      where: { category: { id: categoryId } },
    });
  }

  async getArticleById(id: number): Promise<Article> {
    return await this.articleRepo.findOne({
      where: { id },
      relations: ["category", "image", "author"],
    });
  }

  async createArticle(user: User, createArticleDto: CreateArticleDto) {
    const author = await this.usersService.findUserById(user.id);
    const category = await this.categoriesService.getById(
      createArticleDto.categoryId,
    );

    try {
      const newArticle = new Article();
      newArticle.title = createArticleDto.title;
      newArticle.body = createArticleDto.body;
      newArticle.category = category;
      newArticle.author = author;

      if (createArticleDto.image) {
        const articleImage = await this.imagesService.createImage(
          createArticleDto.image,
        );
        newArticle.image = articleImage;
      }

      const createArticle = this.articleRepo.create(newArticle);
      return await this.articleRepo.save(createArticle);
    } catch (err) {
      console.error("Error creating article:", err);
      throw new Error("Error creating article");
    }
  }

  async updateArticle(
    userId: number,
    updatedArticle: UpdateArticleDto,
  ): Promise<Article> {
    const category = await this.categoriesService.getById(
      updatedArticle.categoryId,
    );

    console.log("Category found:", category);

    const author = await this.usersService.findUserById(userId);

    const originalArticle = await this.articleRepo.findOne({
      where: { id: updatedArticle.id },
    });

    if (category && author && originalArticle) {
      const newArticle = new Article();
      newArticle.id = originalArticle.id;
      newArticle.title = updatedArticle.title || originalArticle.title;
      newArticle.body = updatedArticle.body || originalArticle.body;
      newArticle.category = category;
      newArticle.author = author;
      newArticle.image = updatedArticle.image;
      newArticle.isPublic = updatedArticle.isPublic;
      newArticle.isFeatured = updatedArticle.isFeatured;
      newArticle.YTVideoId =
        updatedArticle.YTVideoId || originalArticle.YTVideoId;
      newArticle.createdAt = originalArticle.createdAt;

      return this.articleRepo.save(newArticle);
    } else {
      console.error("Invalid category or author for article update");
      throw new InternalServerErrorException();
    }
  }

  async deleteArticle(id: number): Promise<void> {
    await this.articleRepo.delete(id);
  }
}
