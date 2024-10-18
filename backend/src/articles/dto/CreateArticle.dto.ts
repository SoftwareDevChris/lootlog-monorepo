import { IsNumber, IsObject, IsString } from "class-validator";
import { ArticleImage } from "src/entities/articleImage.entity";

export class CreateArticleDto {
  @IsString({ message: "Invalid title" })
  title: string;

  @IsString({ message: "Invalid subtitle" })
  subtitle: string;

  @IsNumber()
  categoryId: number;

  @IsObject({ message: "Invalid image" })
  image?: ArticleImage;

  @IsString({ message: "Invalid article body" })
  body: string;

  @IsString({ message: "Invalid YouTube video ID" })
  youtubeVideoId?: string;
}
