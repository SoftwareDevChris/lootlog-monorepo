import { IsBoolean, IsNumber, IsObject, IsString } from "class-validator";
import { Article } from "src/entities/article.entity";
import { ArticleImage } from "src/entities/articleImage.entity";
import { User } from "src/entities/user.entity";
import { CreateArticleImageDto } from "src/images/dto/CreateArticleImage.dto";

export class UpdateArticleDto extends Article {
  @IsString({ message: "Invalid title" })
  title: string;

  @IsString({ message: "Invalid subtitle" })
  subtitle: string;

  @IsObject({ message: "Image must be an object" })
  image?: CreateArticleImageDto;

  @IsString({ message: "Invalid article body" })
  body: string;

  @IsString({ message: "Invalid YouTube video ID" })
  YTVideoId?: string;

  @IsObject()
  author: User;

  @IsNumber()
  categoryId: number;

  @IsBoolean()
  isPublic: boolean;

  @IsBoolean()
  isFeatured: boolean;
}
