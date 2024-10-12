import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Article } from "src/entities/article.entity";
import { Repository } from "typeorm";
import { CreateArticleDto } from "./dto/CreateArticle.dto";

@Injectable()
export class ArticlesService {
  constructor(
    @InjectRepository(Article) private articleRepo: Repository<Article>,
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

  async createArticle(article: CreateArticleDto): Promise<Article> {
    const newArticle = this.articleRepo.create(article);
    return await this.articleRepo.save(newArticle);
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
