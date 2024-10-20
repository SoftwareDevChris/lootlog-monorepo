import { IsNumber, IsObject, IsString } from "class-validator";
import { Article } from "src/entities/article.entity";
import { ArticleImage } from "src/entities/articleImage.entity";
import { CreateArticleImageDto } from "src/images/dto/CreateArticleImage.dto";

export class CreateArticleDto extends Article {
  @IsString({ message: "Invalid title" })
  title: string;

  @IsString({ message: "Invalid subtitle" })
  subtitle: string;

  @IsNumber()
  categoryId: number;

  @IsObject({ message: "Image must be an object" })
  image?: CreateArticleImageDto;

  @IsString({ message: "Invalid article body" })
  body: string;

  @IsString({ message: "Invalid YouTube video ID" })
  YTVideoId?: string;
}
