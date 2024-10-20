import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Article } from "src/entities/article.entity";
import { Repository } from "typeorm";
import { CreateArticleDto } from "./dto/CreateArticle.dto";
import { ArticleImage } from "src/entities/articleImage.entity";
import { storage } from "firebaseConfig";
import { getDownloadURL, ref, uploadString } from "firebase/storage";
import { User } from "src/entities/user.entity";
import { CategoriesService } from "src/categories/categories.service";
import { UsersService } from "src/users/users.service";
import { ImagesService } from "src/images/images.service";

@Injectable()
export class ArticlesService {
  constructor(
    @InjectRepository(Article) private articleRepo: Repository<Article>,
    private categoriesService: CategoriesService,
    private usersService: UsersService,
    private imagesService: ImagesService,
  ) {}

  async getAllArticles(): Promise<Article[]> {
    return await this.articleRepo.find();
  }

  async getArticlesByAuthor(userId: number): Promise<Article[]> {
    return await this.articleRepo.find({ where: { author: { id: userId } } });
  }

  async getArticlesByCategory(categoryId: number): Promise<Article[]> {
    return await this.articleRepo.find({
      where: { category: { id: categoryId } },
    });
  }

  async getArticleById(id: number): Promise<Article> {
    return await this.articleRepo.findOne({ where: { id } });
  }

  async createArticle(user: User, createArticleDto: CreateArticleDto) {
    const author = await this.usersService.findUserById(user.id);
    const category = await this.categoriesService.getById(
      createArticleDto.categoryId,
    );

    try {
      const newArticle = new Article();
      newArticle.title = createArticleDto.title;
      newArticle.subtitle = createArticleDto.subtitle;
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
    id: number,
    updatedArticle: Partial<Article>,
  ): Promise<void> {
    const articleToUpdate = await this.articleRepo.findOne({ where: { id } });

    if (articleToUpdate) {
      await this.articleRepo.update(id, updatedArticle);
    } else return null;
  }

  async deleteArticle(id: number): Promise<void> {
    await this.articleRepo.delete(id);
  }
}
